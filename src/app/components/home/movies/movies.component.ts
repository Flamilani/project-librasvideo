import { MovieSheetComponent } from './../movie-sheet/movie-sheet.component';
import { Category } from './../../../shared/models/genre.model';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Movie } from './../../../shared/models/movie.model';
import { MoviesService } from './../../../shared/services/movies.service';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { Categories } from './../../../shared/interfaces/categories.interface';
import { CATEGORIES } from './../../../shared/constants/categories.constant';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @ViewChild('myCarousel') myCarousel: any;
  @ViewChild('myCarouselThumbs') myCarouselThumbs: any;

  imgLoading = environment.imgLoading;

  loading!: boolean;

  getCategories: Categories[] = CATEGORIES;

  categories!: Category;
  listCategories!: Category[];
  movies!: Movie[];

  moviesAction!: Movie[];
  moviesAdventure!: Movie[];
  moviesAnimation!: Movie[];
  moviesComedy!: Movie[];
  moviesDocumentary!: Movie[];
  moviesDrama!: Movie[];
  moviesRomance!: Movie[];
  moviesThriller!: Movie[];
  moviesHorror!: Movie[];

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

  this.loading = true;
    setTimeout (() => {
      this.loading = false;
      this.loadCategories();
      this.moviesByAction();
      this.moviesByAdventure();
      this.moviesByAnimation();
      this.moviesByComedy();
      this.moviesByDocumetary();
      this.moviesByDrama();
      this.moviesByRomance();
      this.moviesByThriller();
      this.moviesByHorror();
   }, 2000);

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
           this.listCategories = movie;
          }
       );
  }

  loadCategories() {
    return this.getCategories;
  }

  loadGenres() {
    this.moviesService.loadCategories().subscribe(categories => {
      this.listCategories = categories;
    });
  }


  moviesByCategory() {
    this.moviesService.loadMoviesByCategory(this.getCategories[0].nameCategory)
      .subscribe(movies => {
        this.movies = movies;
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

  moviesByComedy() {
    this.moviesService.loadMoviesByCategory('COMEDY')
      .subscribe(movies => {
        this.moviesComedy = movies;
      });
  }

  moviesByDrama() {
     this.moviesService.loadMoviesByCategory('DRAMA')
      .subscribe(movies => {
        this.moviesDrama = movies;
      });
  }

  moviesByDocumetary() {
    this.moviesService.loadMoviesByCategory('DOCUMENTARY')
     .subscribe(movies => {
       this.moviesDocumentary = movies;
     });
 }

 moviesByRomance() {
  this.moviesService.loadMoviesByCategory('ROMANCE')
   .subscribe(movies => {
     this.moviesRomance = movies;
   });
}

moviesByThriller() {
  this.moviesService.loadMoviesByCategory('THRILLER')
   .subscribe(movies => {
     this.moviesThriller = movies;
   });
}

moviesByHorror() {
  this.moviesService.loadMoviesByCategory('HORROR')
   .subscribe(movies => {
     this.moviesHorror = movies;
   });
}

  moviesByCateg() {
    let item = this.getCategories;
    item.forEach((item) => {
 {

      this.moviesService.loadMoviesByCategory(item.arrayCategory)
      .subscribe(movies => {
        this.moviesDrama = movies;
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
            this.moviesService.loadMoviesByGenre(item.seqNo)
            .subscribe(movies => {
              this.movies = movies;
            });

          } */

        }
      );
  }

  getById(id: string) {
     this.moviesService.getMovie(id)
       .subscribe(
         movie => {
           this.movie = movie;
          }
       );
 }

  goToMovie(movie: Movie) {
    const bottomSheetConfig = new MatBottomSheetConfig();

    bottomSheetConfig.data = movie;

     this._bottomSheet.open(MovieSheetComponent, bottomSheetConfig)
     .afterDismissed()
      .subscribe(val => {
        if (val) {
          this.movieVisualizado.emit();
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
