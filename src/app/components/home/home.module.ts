import { MaterialModule } from './../../shared/material/material.module';
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
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';
import { MovieSheetComponent } from './movie-sheet/movie-sheet.component';
import { PaymentComponent } from './payment/payment.component';
import { SidenavListComponent } from './templates/sidenav-list/sidenav-list.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { MoviesFavoritesComponent } from './movies-favorites/movies-favorites.component';

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
    MovieSheetComponent,
    PaymentComponent,
    SidenavListComponent,
    MovieSearchComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ProfileEditComponent,
    MoviesFavoritesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    SharedModule,
    IvyCarouselModule,
    CarouselModule,
    MaterialModule,
    Ng2SearchPipeModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
