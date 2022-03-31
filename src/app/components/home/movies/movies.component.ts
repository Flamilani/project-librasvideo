import { MovieSheetComponent } from './../movie-sheet/movie-sheet.component';
import { Category } from './../../../shared/models/genre.model';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Movie } from './../../../shared/models/movie.model';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { Categories } from 'src/app/shared/interfaces/categories.interface';
import { CATEGORIES } from 'src/app/shared/constants/categories.constant';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @ViewChild('myCarousel') myCarousel: any;
  @ViewChild('myCarouselThumbs') myCarouselThumbs: any;

  imgLoading = '../../../../assets/img/loading.gif';
  loading!: boolean;

  getCategories: Categories[] = CATEGORIES;

  categories!: Category;
  listCategories!: Category[];
  movies!: Movie[];

  moviesAction!: Movie[];
  moviesAdventure!: Movie[];
  moviesAnimation!: Movie[];
  moviesDrama!: Movie[];

  movie!: Movie | null;

  @Output()
  movieVisualizado = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    public moviesService: MoviesService,
    private router: Router,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {

/*
    this.loading = true;
    setTimeout (() => {
      this.loading = false;
      this.loadGenres();
      this.moviesByGenre();
   }, 2000); */

   this.loadCategories();

   this.moviesByAction();
   this.moviesByAdventure();
   this.moviesByAnimation();
   this.moviesByDrama();
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag: true,
    dots: false,
    merge: true,
    mergeFit: true,
    fluidSpeed: true,
    navSpeed: 600,
    margin: 10,
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: false
  }

  showNameCategory(id: any) {
    this.moviesService.showCategory(id)
       .subscribe(
         movie => {
           console.log(movie);
           this.listCategories = movie;
          }
       );
  }

  loadCategories() {
    console.log(this.getCategories);
    return this.getCategories;
  }

  loadGenres() {
    this.moviesService.loadCategories().subscribe(categories => {
      this.listCategories = categories;
   //   console.log(this.listGenres);
    });
  }


  moviesByCategory() {
    console.log(this.getCategories[1].nameCategory);
    this.moviesService.loadMoviesByCategory(this.getCategories[0].nameCategory)
      .subscribe(movies => {
        this.movies = movies;
        console.log(movies);
      });
  }

  moviesByAction() {
    this.moviesService.loadMoviesByCategory('ACTION')
      .subscribe(movies => {
        this.moviesAction = movies;
      });
  }

  moviesByAdventure() {
    this.moviesService.loadMoviesByCategory('ADVENTURE')
      .subscribe(movies => {
        this.moviesAdventure = movies;
      });
  }

  moviesByAnimation() {
    this.moviesService.loadMoviesByCategory('ANIMATION')
      .subscribe(movies => {
        this.moviesAnimation = movies;
      });
  }

  moviesByDrama() {
     this.moviesService.loadMoviesByCategory('DRAMA')
      .subscribe(movies => {
        this.moviesDrama = movies;
      });
  }

  moviesByCateg() {
    let item = this.getCategories;
    item.forEach((item) => {
 {

      this.moviesService.loadMoviesByCategory(item.arrayCategory)
      .subscribe(movies => {
        this.moviesDrama = movies;
        console.log('seq', item.arrayCategory);
        console.log('filmes: ', this.movies);
        console.log('filmes por categoria', movies[0]?.category);
      })
  }
});
/*     this.moviesService.loadMoviesByCategory('ANIMATION')
      .subscribe(movies => {
        this.moviesAnimation = movies;
      }); */
  }



  moviesByGenre() {
    this.moviesService.loadCategories()
      .subscribe(
        categories => {
          this.listCategories = categories;
         // console.log(this.listGenres[0]?.name);

          console.log('item',this.listCategories[0]?.seqNo);
          this.moviesService.loadMoviesByCategory(this.listCategories[0]?.seqNo)
          .subscribe(movies => {
            this.movies = movies;
            console.log('filmes agrupados', this.movies[0]?.category);
          });

  /*          for (var item of categories) {
            console.log('item',item.seqNo);
            this.moviesService.loadMoviesByGenre(item.seqNo)
            .subscribe(movies => {
              this.movies = movies;
              console.log('seq', item.seqNo);
              console.log('filmes: ', this.movies);
              console.log('filmes por categoria', movies[0]?.categoryId);
            });

          } */

        }
      );
  }

  getById(id: string) {
     this.moviesService.getMovie(id)
       .subscribe(
         movie => {
           console.log(movie);
           this.movie = movie;
          }
       );
 }

  goToMovie(movie: Movie) {
    const bottomSheetConfig = new MatBottomSheetConfig();

    bottomSheetConfig.data = movie;

     console.log("movie detail: " + movie.id);
     this._bottomSheet.open(MovieSheetComponent, bottomSheetConfig)
     .afterDismissed()
      .subscribe(val => {
        if (val) {
          this.movieVisualizado.emit();
        }
      });
   }

  listMovies() {
    this.moviesService.index().subscribe(movies => {
      this.movies = movies;
    //  console.log(movies);
      for (var item of movies) {
        console.log(item.title);
      }
    });
  }

  handleCarouselEvents(event: any) {
    console.log('filme');
    this.router.navigateByUrl('home/cadastro');
    if (event.name === "transitionend") {
        this.myCarouselThumbs.select(this.myCarousel.slideCounter)
    }
}

}
