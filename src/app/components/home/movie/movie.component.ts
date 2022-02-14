import { MoviesService } from './../movies/service/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './../../../shared/models/movie.model';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movies!: Movie[];

  movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService
  ) { }

  ngOnInit(): void {
    //  this.movie = this.route.snapshot.data['movies'];

    this.route.params.subscribe(params => {
      console.log(this.movie.id);
      this.movie.id == params['id'];
      console.log(this.movie.id);
    });
  }

}
