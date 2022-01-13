import { RegisterComponent } from './register/register.component';
import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { EntraceComponent } from './entrace/entrace.component';
import { MessageModule } from '../message/message.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './../templates/header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    EntraceComponent,
    LoginComponent,
    MoviesComponent,
    RegisterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    SharedModule,
    IvyCarouselModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
