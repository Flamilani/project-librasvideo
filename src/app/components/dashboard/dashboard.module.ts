import { MoviesService } from './../home/movies/service/movies.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoviesCreateComponent } from './movies/movies-create/movies-create.component';
import { MoviesIndexComponent } from './movies/movies-index/movies-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard.component';
import { MessageModule } from 'src/app/shared/components/message/message.module';
import { GenresComponent } from './genres/genres.component';
import { PaymentsComponent } from './payments/payments.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';
import { ModalComponent } from './templates/modal/modal.component';
import { MoviesEditComponent } from './movies/movies-edit/movies-edit.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    GenresComponent,
    PaymentsComponent,
    UsersComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    MoviesIndexComponent,
    MoviesCreateComponent,
    MoviesEditComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    MoviesService
  ],
})
export class DashboardModule { }
