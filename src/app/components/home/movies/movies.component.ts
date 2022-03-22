import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Genre } from './../../../shared/models/genre.model';
import { Movie } from './../../../shared/models/movie.model';
import { MoviesService } from 'src/app/shared/services/movies.service';

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

  genres!: Genre;
  listGenres!: Genre[];
  movies!: Movie[];

  images = [
    {path: 'https://image.tmdb.org/t/p/original/4MXfPlVS5aY6FJlJ5Y0qXsPnNcy.jpg'},
    {path: 'https://image.tmdb.org/t/p/original/nSNle6UJNNuEbglNvXt67m1a1Yn.jpg'}
];

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loading = true;
    setTimeout (() => {
      this.loading = false;
      this.loadGenres();
      this.movieByGenre();
   }, 2000);
  }

  owlDragging(e: any){
    console.log(e);
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



  loadGenres() {
    this.moviesService.loadGenres().subscribe(genres => {
      this.listGenres = genres;
      console.log(this.listGenres);
    });
  }

  movieByGenre() {
    console.log(this.genres);

    this.moviesService.loadMoviesByGenre("acao");

    this.moviesService.findMovies()
    .subscribe(
      movies => {
        this.movies = movies;
        console.log(this.movies);
      }
    );
  }

  goToMovie(id: any) {
    this.router.navigate([`home/filme/${id}`]);
    console.log("movie detail: " + id);
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
