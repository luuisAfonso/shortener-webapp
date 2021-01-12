import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenerRoutingModule } from './shortener-routing.module';
import { NbLayoutModule, NbButtonModule, NbInputModule, NbCardModule, NbIconModule, NbListModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { ShortItComponent } from './components/short-it/short-it.component';
import { ThemeModule } from '../@theme/theme.module';
import { ShortenerLayoutComponent } from './shortener-layout.component';
import { UrlListComponent } from './components/url-list/url-list.component';
import { UrlItemComponent } from './components/url-list/url-item/url-item.component';


@NgModule({
  declarations: [
    ShortItComponent,
    ShortenerLayoutComponent,
    UrlListComponent,
    UrlItemComponent,
  ],
  imports: [
    CommonModule,
    ShortenerRoutingModule,
    RouterModule,
    NbButtonModule,
    NbLayoutModule,
    NbInputModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbListModule,

  ]
})
export class ShortenerModule { }
