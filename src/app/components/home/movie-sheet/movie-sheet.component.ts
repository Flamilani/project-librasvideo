import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/shared/models/movie.model';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-movie-sheet',
  templateUrl: './movie-sheet.component.html',
  styleUrls: ['./movie-sheet.component.scss']
})
export class MovieSheetComponent implements OnInit {

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
     private bottomSheetRef: MatBottomSheetRef<MovieSheetComponent>
   ) {
     this.movie = movie;
     this.getById(movie?.id);
   }

   ngOnInit(): void {

   }

   goToMovie(id: any) {
     console.log('id', id);
     this.router.navigate([`home/assistir/${id}`]);
     this.bottomSheetRef.dismiss();
   }

   getById(id: string) {
      // this.movieId = id;
       this.moviesService.getMovie(id)
         .subscribe(
           movie => console.log(movie)
         );
   }

   closeSheet() {
     this.bottomSheetRef.dismiss();
   }

}
