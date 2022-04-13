import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AGES } from './../../../shared/constants/age.constant';
import { Age } from './../../../shared/interfaces/age.interface';
import { MoviesService } from './../../../shared/services/movies.service';
import { Movie } from './../../../shared/models/movie.model';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  getAges: Age[] = AGES;
  movies!: Movie;
  movieId!: string;
  movie!: Movie | null;
  //movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public moviesService: MoviesService,
  ) {

  }

  ngOnInit(): void {
/*      this.movie = this.route.snapshot.data['movies'];

     this.route.params.subscribe(params => {

      this.movie?.id == params['id'];

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

  goToMovie(id: any) {
    this.router.navigate([`assistir/${id}`]);
  }

}
