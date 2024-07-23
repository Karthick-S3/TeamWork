import { Component, HostListener,OnInit } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private ngxService : NgxUiLoaderService ) {}
  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
    this.ngxService.stop();
    }, 1000);
  }

  

  title = 'Teamwork-appz';
  isScrolled: boolean = false;
Scrolledlogo: boolean = false;

  @HostListener('window:scroll', [])


  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
    this.Scrolledlogo = window.scrollY > 100;
  }
}
