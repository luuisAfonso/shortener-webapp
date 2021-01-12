import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NbAuthResult, NbPasswordAuthStrategy } from '@nebular/auth';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class CustomEmailPasswordStrategyService extends NbPasswordAuthStrategy {

  constructor(http: HttpClient, route: ActivatedRoute) {
    super(http, route);
  }

  authenticate(data?: any): Observable<NbAuthResult> {

    const user = { password: data.password, email: data.email };

    return super.authenticate(user);
  }

  register(data?: any): Observable<NbAuthResult> {

    const user = { name: data.fullName, password: data.password, email: data.email };

    return super.register(user);
  }

}
