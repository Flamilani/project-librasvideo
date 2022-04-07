import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AGES } from 'src/app/shared/constants/age.constant';
import { CATEGORIES } from 'src/app/shared/constants/categories.constant';
import { Age } from 'src/app/shared/interfaces/age.interface';
import { Categories } from 'src/app/shared/interfaces/categories.interface';
import { Movie } from 'src/app/shared/models/movie.model';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { NotificationService } from './../../../../shared/services/notification.service';


@Component({
  selector: 'app-movies-edit',
  templateUrl: './movies-edit.component.html',
  styleUrls: ['./movies-edit.component.scss']
})
export class MoviesEditComponent implements OnInit {
  // movie!: Movie | null;
  getAges: Age[] = AGES;
  getCategories: Categories[] = CATEGORIES;

  movieId!: string;

  movie!: Movie | null;

  form = this.fb.group({
    title: ['', Validators.required],
    director: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    age: ['', Validators.required],
    year: ['', Validators.required],
    url: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private notifyService : NotificationService
  ) {

    const val = this.form.value;

    this.form = this.fb.group({
      title: [val.title, Validators.required],
      director: [val.director, Validators.required],
      category: [val.category, Validators.required],
      description: [val.description, Validators.required],
      age: [val.age, Validators.required],
      year: [val.year, Validators.required],
      url: [val.url, Validators.required]
    });
  }

  ngOnInit(): void {
    this.movieId = this.afs.createId();
    this.getById();

    this.listCategories();
  }


  listCategories() {
    return this.getCategories;
  }

  getById() {
    this.movieId = this.route.snapshot.params['id'];
    this.moviesService.getMovie(this.movieId)
      .subscribe(
        movie => this.movie = movie
      );
  }

  /*   onSubmit({value, valid}: {value: Movie, valid: boolean}) {
      if (!valid) {
        this.toastService.show('Erro ao atualizar filme', {
          classname: 'bg-danger text-light',
          delay: 5000,
          autohide: true
        });
      } else {
        value.id = this.movieId;
        const changes = this.form.value;
        this.moviesService.updateMovie(value, changes)
      }
    } */

  onSubmit() {
    const changes = this.form.value;
    this.movieId = this.route.snapshot.params['id'];
    console.log(changes);
    this.moviesService.updateMovie(this.movieId, changes)
      .subscribe(() => {
        this.notifyService.showSuccess("Filme atualizado com sucesso!");
      });
      this.router.navigateByUrl('admin/filmes');
  }

  updateMovie() {
    const changes = this.form.value;
    const movieId = this.route.snapshot.params['id'];

    this.moviesService.updateMovie(movieId, changes)
      .subscribe(() => {
        this.notifyService.showSuccess("Filme atualizado com sucesso!");
      });

    const val = this.form.value;

    const newMovie: Partial<Movie> = {
      title: val.title,
      director: val.director,
      category: val.category,
      description: val.description,
      age: val.age,
      year: val.year,
      url: val.url
    }

    this.moviesService.createMovie(newMovie, this.movieId)
      .pipe(
        tap(movie => {
          console.log("Created new movie: ", movie);
          this.notifyService.showSuccess("Filme adicionado com sucesso!");
          this.router.navigateByUrl('admin/filmes');
        }),
        catchError(err => {
          console.log(err);
          alert("Could not create the movie.");
          return throwError(err);
        })
      )
      .subscribe();
  }

  back() {
    this.router.navigateByUrl('admin/filmes');
  }

}
