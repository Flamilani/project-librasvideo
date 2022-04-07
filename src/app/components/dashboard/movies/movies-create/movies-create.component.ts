import { CATEGORIES } from './../../../../shared/constants/categories.constant';
import { Categories } from './../../../../shared/interfaces/categories.interface';
import { Category } from './../../../../shared/models/genre.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { catchError, concatMap, last, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Movie } from './../../../../shared/models/movie.model';
import { MoviesService } from './../../../../shared/services/movies.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AGES } from './../../../../shared/constants/age.constant';
import { Age } from './../../../../shared/interfaces/age.interface';

@Component({
  selector: 'app-movies-create',
  templateUrl: './movies-create.component.html',
  styleUrls: ['./movies-create.component.scss']
})
export class MoviesCreateComponent implements OnInit {

  getAges: Age[] = AGES;
  getCategories: Categories[] = CATEGORIES;

  movieId!: string;

  categories!: Category[];

  percentageChanges$: Observable<any> | undefined;

  iconUrl!: string;

  form = this.fb.group({
    title: ['', Validators.required],
    director: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    age: ['', Validators.required],
    year: ['', Validators.required],
    url: ['', Validators.required],
    iconUrl: [null]
  });

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private router: Router,
    private notifyService : NotificationService
  ) { }

  ngOnInit(): void {
    this.movieId = this.afs.createId();
  //  this.listGenres();
    this.listCategories();
  }

  uploadImage(event: any) {
    const file: File = event.target.files[0];

    const filePath = `movies/${this.movieId}/${file.name}`;

    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });

    this.percentageChanges$ = task.percentageChanges();

    task.snapshotChanges()
    .pipe(last(),
      concatMap(() => this.storage.ref(filePath).getDownloadURL()),
      tap(url => this.iconUrl = url),
      tap(url => this.form.get('iconUrl')?.setValue(url)),
      catchError(err => {
        console.log(err);
        alert("Could not create thumbnail url.");
        return throwError(err);
      })
    ).subscribe();
  }

  listCategories() {
    return this.getCategories;
  }

  createMovie() {
    const val = this.form.value;

    const newMovie: Partial<Movie> = {
      title: val.title,
      director: val.director,
      category: val.category,
      description: val.description,
      age: val.age,
      year: val.year,
      url: val.url,
      iconUrl: val.iconUrl
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

  listGenres() {
    this.moviesService.loadCategories().subscribe(categories => {
      this.categories = categories;
      for (var item of categories) {
        console.log(item.name);
      }
    });
  }

  back() {
    this.router.navigateByUrl('admin/filmes');
  }

}
