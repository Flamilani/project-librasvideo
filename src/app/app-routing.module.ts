import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'app'
  },
  {
    path: 'app',
    loadChildren: () => import('./components/start/start.module').then((m) => m.StartModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'assistir/:id',
    loadChildren: () => import('./components/home/movie-watch/movie-watch.module').then((m) => m.MovieWatchModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
