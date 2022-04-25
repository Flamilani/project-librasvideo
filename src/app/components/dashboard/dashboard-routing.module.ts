import { CreateAccountComponent } from './create-account/create-account.component';
import { AuthAdminGuard } from './../../shared/auth/auth-admin.guard';
import { MovieCoverEditComponent } from './movies/movie-cover-edit/movie-cover-edit.component';
import { MoviesCreateComponent } from './movies/movies-create/movies-create.component';
import { MoviesIndexComponent } from './movies/movies-index/movies-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard.component';
import { MoviesEditComponent } from './movies/movies-edit/movies-edit.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'filmes'
  },
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'criar-conta', component: CreateAccountComponent
      },
      {
        path: 'filmes', component: MoviesIndexComponent,
      //  canActivate: [AuthAdminGuard],
      },
      {
        path: 'novo-filme', component: MoviesCreateComponent,
      //  canActivate: [AuthAdminGuard],
      },
      {
        path: 'filme/:id', component: MoviesEditComponent,
      //  canActivate: [AuthAdminGuard],
      },
      {
        path: 'editar-capa/:id', component: MovieCoverEditComponent,
      //  canActivate: [AuthAdminGuard],
      },
      {
        path: 'usuarios', component: UsersComponent,
      //  canActivate: [AuthAdminGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
