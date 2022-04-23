import { MoviesFavoritesComponent } from './movies-favorites/movies-favorites.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { PaymentComponent } from './payment/payment.component';
import { MovieWatchComponent } from './movie-watch/movie-watch.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EntraceComponent } from './entrace/entrace.component';
import { MovieComponent } from './movie/movie.component';
import { AuthGuard } from '../../shared/auth/auth.guard';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'entrada', component: EntraceComponent,
      //  canActivate: [AuthGuard]
      // -- TODO: Melhoria de refatoração de direcionamento para entrada após login.
      },
      {
        path: 'cadastro', component: RegisterComponent
      },
      {
        path: 'perfil', component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'editar-perfil', component: ProfileEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'esqueci-senha', component: ForgotPasswordComponent
      },
      {
        path: 'pagamento', component: PaymentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'busca-filmes', component: MovieSearchComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'filmes', component: MoviesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'favoritos', component: MoviesFavoritesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'detalhe/:id', component: MovieComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
