import { Component } from '@angular/core';

@Component({
  selector: 'one-column-layout',
  template: `
    <nb-layout windowMode>
    <nb-layout-header fixed>
      <app-ngx-header></app-ngx-header>
    </nb-layout-header>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})

export class oneColumnLayoutComponent {}
