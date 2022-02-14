import { MoviesIndexComponent } from './movies-index/movies-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { MoviesCreateComponent } from './movies-create/movies-create.component';

const routes: Routes = [
  {
    path: '', component: MoviesComponent,
    children: [
      {
        path: 'lista-filmes', component: MoviesIndexComponent
      },
      {
        path: 'novo-filme', component: MoviesCreateComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
