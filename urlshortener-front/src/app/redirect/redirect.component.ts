import { ShortenerService } from 'src/app/@shared/shortner.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private shortenerService: ShortenerService) { }

  notFound = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let urlId = params.id;

      this.shortenerService.getUrlById(urlId).subscribe(url => {
        let { originalUrl } = url ;
        
        if(!originalUrl.includes('http')) {
          originalUrl = 'https://' + originalUrl;
        }
        window.location.href = originalUrl;
      }, err => {
        if(err.status === 404) {
          this.notFound = true;
        }
      })
    })
  }

  goToHome() {
    this.router.navigate(['shortener']);
  }

}
