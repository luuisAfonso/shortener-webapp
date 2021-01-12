import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortener-layout',
  template: `
    <one-column-layout>
      <router-outlet></router-outlet>
    </one-column-layout>
  `,
  styles: [
  ]
})
export class ShortenerLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
