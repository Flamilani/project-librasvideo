import { MoviesService } from './../../../shared/services/movies.service';
import { Movie } from './../../../shared/models/movie.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  searchText: any;

  movies!: Movie[];

  constructor(
    private moviesService: MoviesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.listMovies();
  }

  search() {

  }

  listMovies() {
    this.moviesService.loadMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  goToMovie(id: any) {
    console.log('id', id);
    this.router.navigate([`home/detalhe/${id}`]);
  }
}
