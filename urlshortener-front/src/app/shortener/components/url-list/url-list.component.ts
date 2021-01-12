import { ShortenerService } from './../../../@shared/shortner.service';
import { Component, Input, OnInit } from '@angular/core';
import { Url } from '../../../@shared/models/url';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.scss']
})
export class UrlListComponent implements OnInit {

  @Input() userEmail: string | undefined;
  @Input() subject: Observable<void> | undefined;
  urls: Url[] = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 0;
  loading = false;


  constructor(private shortenerService: ShortenerService) { }

  ngOnInit(): void {
    this.subject?.subscribe(() => {
      this.pageToLoadNext = 0;
      this.urls = [];
      this.loadNext();
    });
  }

  loadNext() {
    if (this.loading) { return }

    this.loading = true;
    this.shortenerService.loadUrls(this.pageToLoadNext, this.pageSize, this.userEmail || '')
      .subscribe(response => {
        let urls = response.content;
        this.placeholders = [];
        this.urls.push(...urls);
        this.loading = false;
        this.pageToLoadNext++;
      });
  }

}
