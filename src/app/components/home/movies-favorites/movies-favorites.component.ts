import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from './../../../shared/models/movie.model';
import { MoviesService } from './../../../shared/services/movies.service';

@Component({
  selector: 'app-movies-favorites',
  templateUrl: './movies-favorites.component.html',
  styleUrls: ['./movies-favorites.component.scss']
})
export class MoviesFavoritesComponent implements OnInit {
  movies!: Movie[];

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listMovies();
  }

  listMovies() {
    this.moviesService.loadMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  goToMovie(id: any) {
    this.router.navigate([`home/detalhe/${id}`]);
  }

}
