import { MaterialModule } from './../../shared/material/material.module';
import { FooterComponent } from './../../shared/components/footer/footer.component';
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
import { MessageModule } from 'src/app/shared/components/message/message.module';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [
    HomeComponent,
    EntraceComponent,
    LoginComponent,
    MoviesComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MovieComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    SharedModule,
    IvyCarouselModule,
    MaterialModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
