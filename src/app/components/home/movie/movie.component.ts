import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { Movie } from './../../../shared/models/movie.model';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';


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
  movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public moviesService: MoviesService,
    @Inject(MAT_BOTTOM_SHEET_DATA) movie: Movie,
    private bottomSheetRef: MatBottomSheetRef<MovieComponent>
  ) {
    this.movie = movie;
    this.getById(movie?.id);
  }

  ngOnInit(): void {
    //  this.movie = this.route.snapshot.data['movies'];

/*     this.route.params.subscribe(params => {
      console.log(this.movie.id);
      this.movie.id == params['id'];
      console.log(this.movie.id);
    }); */
  //  this.getById();
  }

/*   getById() {
    this.movieId = this.route.snapshot.params['id'];
    this.moviesService.getMovie(this.movieId)
      .subscribe(
        movie => this.movie = movie
      );
  } */

  goToMovie(id: any) {
    console.log('id', id);
    this.router.navigate([`home/filme/${id}`]);
  }

  getById(id: string) {
     // this.movieId = id;
      this.moviesService.getMovie(id)
        .subscribe(
          movie => console.log(movie)
        );
  }


}
