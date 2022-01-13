import { MessageModule } from './../message/message.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesIndexComponent } from './movies/movies-index/movies-index.component';
import { MoviesCreateComponent } from './movies/movies-create/movies-create.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    MoviesComponent,
    MoviesIndexComponent,
    MoviesCreateComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
