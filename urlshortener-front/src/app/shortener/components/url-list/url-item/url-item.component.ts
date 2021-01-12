import { Url } from './../../../../@shared/models/url';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'ngx-url-item',
  template: `
    <div routerLink="/{{url?.id}}">
      <p class="original-url">
        <strong>{{url?.originalUrl}}</strong>
      </p>
      <p class="short-url"> Encurtada: {{urlPrefix + url?.id}}</p>
    </div>
    <div class="button-container">
      <button status="info" nbButton (click)="copyShortUrlToClipboard()">
        <nb-icon icon="copy-outline"></nb-icon>
      </button>
    </div>
  `,
  styleUrls: ['./url-item.component.scss']
})
export class UrlItemComponent {

  @Input()
  url: Url | undefined = undefined;
  urlPrefix = environment.origin;


  copyShortUrlToClipboard() {
    if(this.url?.id === '') return;

    this.copyToClipboard( this.urlPrefix + this.url?.id);
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
