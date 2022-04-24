import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap, last, tap } from 'rxjs/operators';
import { Movie } from './../../../../shared/models/movie.model';
import { MoviesService } from './../../../../shared/services/movies.service';
import { NotificationService } from './../../../../shared/services/notification.service';

@Component({
  selector: 'app-movie-cover-edit',
  templateUrl: './movie-cover-edit.component.html',
  styleUrls: ['./movie-cover-edit.component.scss']
})
export class MovieCoverEditComponent implements OnInit {

  movieId!: string;

  movie!: Movie | null;

  percentageChanges$: Observable<any> | undefined;

  iconUrl!: string;

  form = this.fb.group({
    iconUrl: [null]
  });

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute,
    private notifyService : NotificationService
    ) { }

  ngOnInit(): void {
    this.movieId = this.afs.createId();

    this.getById();
  }

  getById() {
    this.movieId = this.route.snapshot.params['id'];
    this.moviesService.getMovie(this.movieId)
      .subscribe(
        movie => this.movie = movie
      );
  }



  uploadImage(event: any) {
    const file: File = event.target.files[0];

    const filePath = `movies/${this.movieId}/${file.name}`;

    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });

    this.movieId = this.route.snapshot.params['id'];
    this.moviesService.getMovie(this.movieId)
      .subscribe(movie =>
        this.movie = movie
    );

    console.log(this.movie!.iconUrl);

    if (this.movie?.iconUrl ! == null) {
      this.storage.storage.refFromURL(this.movie!.iconUrl).delete();
    }

    this.percentageChanges$ = task.percentageChanges();

    task.snapshotChanges()
    .pipe(last(),
      concatMap(() => this.storage.ref(filePath).getDownloadURL()),
      tap(url => this.iconUrl = url),
      tap(url => this.form.get('iconUrl')?.setValue(url)),
      catchError(err => {
        alert("Could not create thumbnail url.");
        return throwError(err);
      })
    ).subscribe();
  }

  updateCover2() {
    const val = this.form.value;

    const newMovie: Partial<Movie> = {
      iconUrl: val.iconUrl
    }

    this.moviesService.createMovie(newMovie, this.movieId)
      .pipe(
        tap(movie => {
          this.notifyService.showSuccess("Capa adicionada com sucesso!");
          this.router.navigateByUrl('admin/filmes');
        }),
        catchError(err => {
          console.log(err);
          alert("Could not create the movie.");
          return throwError(err);
        })
      )
      .subscribe();
  }

  updateCover() {
    const changes = this.form.value;
    const movieId = this.route.snapshot.params['id'];

    this.moviesService.getMovie(movieId)
      .subscribe(movie =>
        this.movie = movie
      );

    console.log(this.movie!.iconUrl);

    if (this.movie?.iconUrl ! == null) {
    this.storage.storage.refFromURL(this.movie!.iconUrl).delete();
    }

    this.moviesService.updateMovie(movieId, changes)
      .subscribe(() => {
        this.notifyService.showSuccess("Filme atualizado com sucesso!");
        this.router.navigateByUrl('admin/filmes');
      });

  }

  back() {
    this.router.navigateByUrl('admin/filmes');
  }

}
