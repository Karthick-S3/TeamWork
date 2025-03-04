import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  constructor(private ngxService : NgxUiLoaderService){}

  ngOnInit() : void{
    window.scrollTo(0, 0);
    this.ngxService.start();
    
     this.ngxService.stop();
    
  }
  show:boolean=false;
}
