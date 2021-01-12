import { ShortenerLayoutComponent } from './shortener-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShortItComponent } from './components/short-it/short-it.component';

const routes: Routes = [
  {
    path: '',
    component: ShortenerLayoutComponent,
    children: [
      {
        path: '',
        component: ShortItComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShortenerRoutingModule { }
