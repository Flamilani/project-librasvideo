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

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'entrada', component: EntraceComponent
      },
      {
        path: 'cadastro', component: RegisterComponent
      },
      {
        path: 'pagamento', component: PaymentComponent
      },
      {
        path: 'filmes', component: MoviesComponent
      },
      {
        path: 'detalhe/:id', component: MovieComponent
      },
      {
        path: 'assistir/:id', component: MovieWatchComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
