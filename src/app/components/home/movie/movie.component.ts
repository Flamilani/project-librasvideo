import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AGES } from 'src/app/shared/constants/age.constant';
import { Age } from 'src/app/shared/interfaces/age.interface';
import { MoviesService } from 'src/app/shared/services/movies.service';
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
    console.log('id', id);
    this.router.navigate([`assistir/${id}`]);
  }

/*   getById(id: string) {
     // this.movieId = id;
      this.moviesService.getMovie(id)
        .subscribe(
          movie => console.log(movie)
        );
  } */


}
