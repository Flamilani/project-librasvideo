import { Categories } from './../interfaces/categories.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Movie } from '../models/movie.model';
import { APIMovies } from 'src/app/app.api';
import { Category } from '../models/genre.model';
import { convertSnaps } from '../utils/db-utils';


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

/*   public getCategoryByName(name: string[]) {
    switch(name) {
      case ['ACTION']:
        return 'Ação';
      case ['ANIMATION']:
        return 'Animação';
      default:
        return 'Sem categoria';
    }
  } */

  public getCategoryByName(name: string[]) {
    if (name == ['ACTION']) {
      return 'Ação';
    } else if (name == ['ANIMATION']) {
      return 'Animação'
    } else if (name == ['ADVENTURE']) {
      return 'Aventura'
    } else if (name == ['DRAMA']) {
      return 'Drama'
    } else if (name == ['COMEDY']) {
      return 'Comédia'
    } else if (name == ['DOCUMENTARY']) {
      return 'Documentário'
    } else {
      return 'Sem categoria';
    }
  }

  loadCategories(): Observable<Category[]> {
    return this.db.collection("categories").get()
      .pipe(
        map(result => convertSnaps<Category>(result))
      );
  }

  findMovies(): Observable<Movie[]> {

    return this.db.collection("movies").get()
      .pipe(
        map(result => convertSnaps<Movie>(result))
      )

  }

  showCategory(category: any): Observable<Category[]> {
    return this.db.collectionGroup("categories",
      ref => ref.where("seqNo", "==", category)
    )
      .get()
      .pipe(
        map(result => convertSnaps<Category>(result))
      );
  }


  loadMoviesByCategory(category: any): Observable<Movie[]> {
    return this.db.collection("movies",
      ref => ref.where("category", "==", category)
      .orderBy("seqNo")
    )
      .get()
      .pipe(
        map(result => convertSnaps<Movie>(result))
      );
  }

  groupMoviesByGenre(categoryId: any) {
    return this.db.collectionGroup("movies",
      ref => ref.where("category", "==", categoryId)
    ).snapshotChanges()

  }

  loadMovies(): Observable<Movie[]> {
    return this.db.collection(
      "movies", ref => ref.orderBy("seqNo"))
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
    return this.db.collection("movies", ref => ref.orderBy("seqNo", "desc").limit(1))
      .get()
      .pipe(
        concatMap(result => {
          const movies = convertSnaps<Movie>(result);
          const movieSeqNo = movies[0]?.seqNo ?? 0;
          const movie = {
            ...newMovie,
            seqNo: movieSeqNo + 1
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
