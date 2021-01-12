import { Url } from './models/url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const api = environment.baseEndpoint;
const urlApi = '/url/'
const userApi = '/user/'

@Injectable({
  providedIn: 'root'
})
export class ShortenerService {

  constructor(private http: HttpClient) { }

  shortUrl(originalUrl: string): Observable<Url> {
    return this.http.post<Url>(`${api}${urlApi}`, {url: originalUrl});
  }

  shortUrlWithUser(originalUrl: string, userEmail: string): Observable<Url> {
    return this.http.put<Url>(`${api}${userApi}${userEmail}/add-url`, {url: originalUrl})
  }

  loadUrls(pageToLoadNext: number, pageSize: number, userEmail: string): Observable<any> {
    return this.http.get(`${api}${urlApi}by-user-email/${userEmail}`, {params: {page: pageToLoadNext.toString(), size: pageSize.toString(), sort: 'creationTime,desc'}})
  }

  getUrlById(urlId: string): Observable<Url> {
    return this.http.get<Url>(`${api}${urlApi}${urlId}`);
  }

}
