import { RegisterComponent } from './register/register.component';
import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { EntraceComponent } from './entrace/entrace.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { LoginComponent } from './login/login.component';
import { MessageModule } from '../../shared/components/message/message.module';
import { MovieComponent } from './movie/movie.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { GenresComponent } from './genres/genres.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    EntraceComponent,
    LoginComponent,
    MoviesComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MovieComponent,
    GenresComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    SharedModule,
    IvyCarouselModule,
    CarouselModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
