import { MoviesCreateComponent } from './movies/movies-create/movies-create.component';
import { MoviesIndexComponent } from './movies/movies-index/movies-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard.component';
import { MoviesEditComponent } from './movies/movies-edit/movies-edit.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'filmes', component: MoviesIndexComponent
      },
      {
        path: 'novo-filme', component: MoviesCreateComponent
      },
      {
        path: 'filme/:id', component: MoviesEditComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
