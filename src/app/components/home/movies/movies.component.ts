import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from './model/movie.model';
import { MoviesService } from './service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @ViewChild('myCarousel') myCarousel: any;
  @ViewChild('myCarouselThumbs') myCarouselThumbs: any;

  movies!: Movie[];

  images = [
    {path: 'https://image.tmdb.org/t/p/original/4MXfPlVS5aY6FJlJ5Y0qXsPnNcy.jpg'},
    {path: 'https://image.tmdb.org/t/p/original/nSNle6UJNNuEbglNvXt67m1a1Yn.jpg'},
    {path: '/assets/photo-1489365091240-6a18fc761ec2.jpg'},
    {path: '/assets/photo-1547691889-841a6f1c5ca6.jpg'},
    {path: '/assets/photo-1595433562696-a8b1cb8bdad1.jpg'},
    {path: '/assets/photo-1495563381401-ecfbcaaa60f2.jpg'},
    {path: '/assets/photo-1534801022022-6e319a11f249.jpg'},
    {path: '/assets/photo-1524324463413-57e3d8392df1.jpg'},
    {path: '/assets/photo-1506086679524-493c64fdfaa6.jpg'},
    {path: '/assets/photo-1569749450723-1836b067fb64.jpg'}
];



  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.listMovies();
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
