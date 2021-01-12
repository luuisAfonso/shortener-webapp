import { NbAuthService } from '@nebular/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngx-header',
  templateUrl: './ngx-header.component.html',
  styleUrls: ['./ngx-header.component.scss']
})
export class NgxHeaderComponent implements OnInit {

  authenticated = false;
  userMail: string = '';
  items: {title: string} [] = [
    {title: 'sair'},
  ]

  constructor(private authService: NbAuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getToken().subscribe(token => {
      if(!token.isValid()) return;
      this.authenticated = true;
      this.userMail = token.getPayload().sub;
    })
  }

  logout(): void {
    this.authService.logout('email').subscribe(result => this.router.navigate(['./auth/login']));
  }

  goToHome(): void {
    this.router.navigate(['/shortener']);
  }

}
