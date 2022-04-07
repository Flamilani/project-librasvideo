import { Category } from './../../../shared/models/genre.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MoviesService } from './../../../shared/services/movies.service';
import { NotificationService } from './../../../shared/services/notification.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genreId!: string;

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private router: Router,
    private notifyService : NotificationService
  ) { }

  ngOnInit(): void {
  }

  form = this.fb.group({
    name: ['', Validators.required],
  });

  createCategory() {
    const val = this.form.value;

    const newMovie: Partial<Category> = {
      name: val.name,
      active: val.active
    }

    this.moviesService.createMovie(newMovie, this.genreId)
      .pipe(
        tap(movie => {
          console.log("Created new movie: ", movie);
          this.notifyService.showSuccess("Filme adicionado com sucesso!");
          this.router.navigateByUrl('admin/categorias');
        }),
        catchError(err => {
          console.log(err);
          alert("Could not create the movie.");
          return throwError(err);
        })
      )
      .subscribe();
  }

  back() {
    this.router.navigateByUrl('admin/categorias');
  }

}
