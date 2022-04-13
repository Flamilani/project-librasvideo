import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './../../../shared/models/movie.model';
import { MoviesService } from './../../../shared/services/movies.service';

@Component({
  selector: 'app-movie-watch',
  templateUrl: './movie-watch.component.html',
  styleUrls: ['./movie-watch.component.scss']
})
export class MovieWatchComponent implements OnInit {

  movies!: Movie;
  movieId!: string;
  movie!: Movie | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.getById();
  }

  getById() {
    this.movieId = this.route.snapshot.params['id'];
    this.moviesService.getMovie(this.movieId)
      .subscribe(
        movie => this.movie = movie
      );
  }

  goToMovie(id: any) {
    this.router.navigate([`home/detalhe/${id}`]);
  }

}
