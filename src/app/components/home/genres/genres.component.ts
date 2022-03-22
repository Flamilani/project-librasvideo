import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { Genre } from './../../../shared/models/genre.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genres!: Genre[];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres() {
    this.moviesService.loadGenres().subscribe(genres => {
      this.genres = genres;
      console.log(this.genres);
    });
  }

}
