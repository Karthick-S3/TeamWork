import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
 

})
export class HomeComponent implements OnInit  {
  constructor(private ngxService : NgxUiLoaderService){}

  cards = [1, 2, 3, 4, 5, 6,7,8,9,10]; 

  ngOnInit(): void {
  //  this.ngxService.start();
  //  setTimeout(() => {
  //   this.ngxService.stop();
  //  }, 1000);
  }

}