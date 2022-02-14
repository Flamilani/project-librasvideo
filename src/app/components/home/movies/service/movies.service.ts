import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { APIMovies } from '../../../../app.api';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { convertSnaps } from 'src/app/shared/utils/db-utils';
import { Movie } from './../../../../shared/models/movie.model';
import { Genre } from './../../../../shared/models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

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
}
