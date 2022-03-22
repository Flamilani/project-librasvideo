import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { Movie } from './../../../shared/models/movie.model';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movies!: Movie[];

 // movie!: Movie;

  movieId!: string;
  // movie!: Movie | null;
  movie: Movie | null = {
    title: '',
    director: '',
    genres: '',
    year: '',
    id: '',
    url: '',
    iconUrl: ''
  }

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    //  this.movie = this.route.snapshot.data['movies'];

/*     this.route.params.subscribe(params => {
      console.log(this.movie.id);
      this.movie.id == params['id'];
      console.log(this.movie.id);
    }); */
    this.getById();
  }

  getById() {
    this.movieId = this.route.snapshot.params['id'];
    this.moviesService.getMovie(this.movieId)
      .subscribe(
        movie => this.movie = movie
      );
  }

}
