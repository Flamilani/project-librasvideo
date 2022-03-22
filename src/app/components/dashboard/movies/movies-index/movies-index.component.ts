import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from './../../../../shared/models/movie.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from './../../../../shared/services/notification.service';
import Swal from 'sweetalert2';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-movies-index',
  templateUrl: './movies-index.component.html',
  styleUrls: ['./movies-index.component.scss']
})
export class MoviesIndexComponent implements OnInit {

  imgLoading = '../../../../assets/img/loading.gif';

  movies!: Movie[];
  loading!: boolean;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private notifyService : NotificationService
    ) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout (() => {
      this.loading = false;
      this.listMovies();
   }, 2500);

  }

  goToMoviesCreate() {
    this.router.navigateByUrl('admin/novo-filme');
  }

  edit() {

  }

  confirmDelete(movie: Movie) {
    Swal.fire({
      title: 'Tem certeza que vai deletar este filme ' + movie.title + '?',
      text: 'Você não poderá recuperar este filme!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, confirmo deletar!',
      cancelButtonText: 'Não, mantenha isso',
    }).then((result) => {

      if (result.isConfirmed) {
        console.log('Clicked, File is deleted!');
        this.delete(movie);
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    })

  }

  delete(movie: Movie) {
      this.moviesService.deleteMovie(movie.id)
      .pipe(
        tap(() => {
          this.notifyService.showSuccess("Filme deletado com sucesso!");
          this.listMovies();
        }),
          catchError(err => {
            console.log(err);
            return throwError(err);
          })
      )
      .subscribe();
  }

  listMovies() {
    this.moviesService.loadMovies().subscribe(movies => {
      this.movies = movies;
      for (var item of movies) {
        console.log(item.title);
      }
    });
  }
}
