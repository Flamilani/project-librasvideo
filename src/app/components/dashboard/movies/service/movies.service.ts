import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import { APIMovies } from '../../../../app.api';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { convertSnaps } from './../../../../shared/utils/db-utils';
import { Genre } from './../../../../shared/models/genre.model';
import { Movie } from './../../../../shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  moviesCollection!: AngularFirestoreCollection<Movie>;
  movieDoc!: AngularFirestoreDocument<Movie>;
  movies!: Observable<Movie[]>;
  movie!: Observable<Movie | null>;

  constructor(
    private http: HttpClient,
    private db: AngularFirestore
  ) { }

  index(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${APIMovies}/movies`).pipe(
      map((obj: any) => obj)
    );
  }

  loadGenres(): Observable<Genre[]> {
    return this.db.collection("genres").get()
      .pipe(
        map(result => convertSnaps<Genre>(result))
      );
  }

  findMovies(): Observable<Movie[]> {

    return this.db.collection("movies").get()
      .pipe(
        map(result => convertSnaps<Movie>(result))
      )

  }

  loadMoviesByGenre(genre: string): Observable<Movie[]> {
    return this.db.collection(
      "movies",
      ref => ref.where("genres", "array-contains", genre)
    )
      .get()
      .pipe(
        map(result => convertSnaps<Movie>(result))
      );
  }

  loadMovies(): Observable<Movie[]> {
    return this.db.collection(
      "movies")
      .get()
      .pipe(
        map(result => convertSnaps<Movie>(result))
      );
  }

/*   getMovie(movieId: string): Observable<Movie[]> {
    return this.db.collection(
      "movies",
      ref => ref.where("id", "array-contains", movieId)
    )
      .get()
      .pipe(
        map(result => convertSnaps<Movie>(result))
      );
  } */


  getMovie(movieId: string) {
    this.movieDoc = this.db.doc<Movie>(`movies/${movieId}`);
    this.movie = this.movieDoc.snapshotChanges().pipe(
        map(action => {
          if (action.payload.exists === false) {
            return null
          } else {
            const data = action.payload.data() as Movie;
            data.id = action.payload.id;
            return data;
          }
        }));

    return this.movie;
  }

  createMovie(newMovie: Partial<Movie>, movieId?: string) {
    return this.db.collection("movies")
      .get()
      .pipe(
        concatMap(result => {
          const movies = convertSnaps<Movie>(result);
          const movie = {
            ...newMovie
          }

          let save$: Observable<any>;
          if(movieId) {
            save$ = from(this.db.doc(`movies/${movieId}`).set(movie));
          } else {
            save$ = from(this.db.collection("movies").add(movie));
          }
          return save$
            .pipe(
              map(res => {
                return {
                  id: movieId ?? res.id,
                  ...movie
                }
              })
            );
        })
      )
  }

  updateMovie(movieId: string, changes: Partial<Movie>): Observable<any> {
    return from(this.db.doc(`movies/${movieId}`).update(changes));
  }

  deleteMovie(movieId: string) {
    return from(this.db.doc(`movies/${movieId}`).delete());
  }
}
