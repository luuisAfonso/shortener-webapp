import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbLayoutModule, NbMenuModule, NbThemeModule, NbButtonModule } from '@nebular/theme';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthJWTInterceptor, NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy, NbTokenLocalStorage, NbTokenStorage, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CustomEmailPasswordStrategyService } from './@auth/custom-email-password-strategy.service';
import { UnauthorizedInterceptorService } from './@auth/interceptors/unauthorized-interceptor.service';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: environment.baseEndpoint,
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          login: {
            endpoint: '/login',
            method: 'POST',
            defaultMessages: ['Você logou com sucesso!'],
            defaultErrors: ['Dados incorretos.']
          },
          register: {
            endpoint: '/user/sign-up',
            method: 'POST',
            defaultMessages: ['Bem-vindo!'],
            defaultErrors: ['Algo deu errado :/.']
          },
          logout: {
            endpoint: '/user/log-out',
            method: 'POST',
          }
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        register: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
      }
    }),
    NbThemeModule.forRoot({name: 'dark'})
  ],
  providers: [
    {
      provide: NbPasswordAuthStrategy, useClass: CustomEmailPasswordStrategyService,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptorService, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true
    },
    {
      provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: (req: Request) => {
          return !req.url.match('');
      },
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
