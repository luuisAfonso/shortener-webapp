import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {
    path: 'shortener',
    loadChildren: () => import('./shortener/shortener.module').then(m => m.ShortenerModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./@auth/auth.module').then(m => m.authModule),
  },
  {
    path: '',
    redirectTo: 'shortener',
    pathMatch: 'full'
  },
  { 
    path: ':id', 
    component: RedirectComponent,
  },
  { 
    path: '**', 
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
