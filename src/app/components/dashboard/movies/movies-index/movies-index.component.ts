import { environment } from 'src/environments/environment';
import { Categories } from './../../../../shared/interfaces/categories.interface';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from './../../../../shared/models/movie.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from './../../../../shared/services/notification.service';
import Swal from 'sweetalert2';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { CATEGORIES } from 'src/app/shared/constants/categories.constant';
import { Age } from 'src/app/shared/interfaces/age.interface';
import { AGES } from 'src/app/shared/constants/age.constant';

@Component({
  selector: 'app-movies-index',
  templateUrl: './movies-index.component.html',
  styleUrls: ['./movies-index.component.scss']
})
export class MoviesIndexComponent implements OnInit {

  imgLoading = environment.imgLoading;

  getAges: Age[] = AGES;

  getCategories: Categories[] = CATEGORIES;

  movies!: Movie[];
  loading!: boolean;

  order: any;

  constructor(
    private router: Router,
    public moviesService: MoviesService,
    private notifyService : NotificationService,

    ) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout (() => {
      this.loading = false;
      this.listMovies();
      this.sortData();
   }, 1000);

   console.log(this.moviesService.getCategoryByName(['ACTION']));

   console.log(this.getCategories);
  }

  goToMoviesCreate() {
    this.router.navigateByUrl('admin/novo-filme');
  }

  edit() {

  }

  sortData() {
    console.log('sort');
    if (this.order) {
      let newarr = this.movies.sort((a, b) => a.seqNo - b.seqNo);
      this.movies = newarr;
    }
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
