import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  

  title = 'Teamwork-appz';
  isScrolled: boolean = false;

  constructor(private router: Router, private ngxService : NgxUiLoaderService ) {}

  ngOnInit() {
    // Initialize AOS
    AOS.init();

    // Refresh AOS on every route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        AOS.refresh();
      }
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }
  
}
