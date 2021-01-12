import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { authRoutingModule } from './auth-routing.module';

import { NgxLoginComponent } from './components/ngx-login/ngx-login.component'
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbIconModule, NbLayoutModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { NgxRegisterComponent } from './components/ngx-register/ngx-register.component';

@NgModule({
  declarations: [NgxLoginComponent, NgxRegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    authRoutingModule,
    RouterModule,
    NbInputModule,
    NbCheckboxModule,
    NbAlertModule,
    NbButtonModule,
    NbIconModule,

    NbAuthModule,
  ]
})
export class authModule { }
