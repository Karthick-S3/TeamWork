import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as AOS from 'aos';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isPopOpen: boolean = false;
  title = 'Teamwork-appz';
  isScrolled: boolean = false;

  constructor(private router: Router, private ngxService: NgxUiLoaderService) {}

  ngOnInit() {
    this.ngxService.start();
    AOS.init();

    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        AOS.refresh();
      }
    });
    this.ngxService.stop();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  togglePop() {
    this.isPopOpen = !this.isPopOpen;
  }

  Closenav(){
    this.isPopOpen = false;
  }
}




