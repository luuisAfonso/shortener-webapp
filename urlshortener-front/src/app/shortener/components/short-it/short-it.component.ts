import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NbAuthService } from '@nebular/auth';
import { ShortenerService } from 'src/app/@shared/shortner.service';
import { environment } from 'src/environments/environment';

const shortUrlPrefix = environment.origin;

@Component({
  selector: 'app-short-it',
  templateUrl: './short-it.component.html',
  styleUrls: ['./short-it.component.scss']
})
export class ShortItComponent implements OnInit {

  authenticated = false;
  newUrlSubject: Subject<void> = new Subject();
  userEmail: string = '';
  originalUrl: FormControl = new FormControl(null, Validators.required);
  shortedUrl: string = '';
  error: string = '';
  info: string = '';

  
  constructor(private shortenerService: ShortenerService, private authService: NbAuthService) { }

  ngOnInit(): void {
    this.authService.getToken().subscribe(token => {
      if(!token.isValid()) return;
      this.authenticated = true;
      this.userEmail = token.getPayload().sub;
    })
  }

  shortUrl(): void {
    this.error = '';

    if(this.originalUrl.invalid) {
      this.error = 'Não podemos encurtar uma url vazia :/, experimente pôr uma url!';
      return;
    }

    this.authenticated ? this.shortUrlWithAuthentication() : this.shortUrlWithoutAuthentication();

  }

  shortUrlWithAuthentication(): void {
    this.shortenerService.shortUrlWithUser(this.originalUrl.value, this.userEmail).subscribe(url => {
      this.shortedUrl = shortUrlPrefix + url.id;
      this.emitListUpdated();
    });
  }

  shortUrlWithoutAuthentication(): void {
    this.shortenerService.shortUrl(this.originalUrl.value).subscribe(url => {
      this.shortedUrl = shortUrlPrefix + url.id;
    });
  }

  emitListUpdated() {
    this.newUrlSubject.next();
  }

  copyShortUrlToClipboard() {
    if(this.shortedUrl === '') return;

    this.copyToClipboard(this.shortedUrl)
    this.info = 'copiado para o clipboard!'
  }

  copyToClipboard(textToCopy: string) {
    let listener = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', (textToCopy));
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

}
