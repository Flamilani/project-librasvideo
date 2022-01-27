import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app/components/home/movies/model/movie.model';

import { APIMovies } from '../../../../app.api';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient,
  ) { }

  index(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${APIMovies}/movies`).pipe(
      map((obj: any) => obj)
    );
  }
}
