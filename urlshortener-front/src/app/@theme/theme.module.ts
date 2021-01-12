import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbContextMenuModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbUserModule } from '@nebular/theme';
import { oneColumnLayoutComponent } from './layouts/one-column-layout.component';
import { RouterModule } from '@angular/router';
import { NgxHeaderComponent } from './componets/ngx-header/ngx-header.component';



@NgModule({
  declarations: [
    oneColumnLayoutComponent,
    NgxHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbUserModule,
    NbIconModule,
    NbContextMenuModule,
  ],
  exports: [
    oneColumnLayoutComponent,
    NbMenuModule,
  ]

})
export class ThemeModule { }
