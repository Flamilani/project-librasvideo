import { MovieWatchComponent } from './movie-watch.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieWatchRoutingModule } from './movie-watch-routing.module';


@NgModule({
  declarations: [
    MovieWatchComponent
  ],
  imports: [
    CommonModule,
    MovieWatchRoutingModule
  ]
})
export class MovieWatchModule { }
