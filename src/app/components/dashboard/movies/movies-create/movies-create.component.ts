import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MoviesService } from '../service/movies.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Movie } from './../../../../shared/models/movie.model';

@Component({
  selector: 'app-movies-create',
  templateUrl: './movies-create.component.html',
  styleUrls: ['./movies-create.component.scss']
})
export class MoviesCreateComponent implements OnInit {

  movieId!: string;

  form = this.fb.group({
    title: ['', Validators.required],
    director: ['', Validators.required],
    genres: ['', Validators.required],
    year: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private afs: AngularFirestore,
    private router: Router,
    private notifyService : NotificationService
  ) { }

  ngOnInit(): void {
    this.movieId = this.afs.createId();
  }

  createMovie() {
    const val = this.form.value;

    const newMovie: Partial<Movie> = {
      title: val.title,
      director: val.director,
      genres: val.genres,
      year: val.year
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
