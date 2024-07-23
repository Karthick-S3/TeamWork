import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  constructor(private ngxService: NgxUiLoaderService){}

  ngOnInit(): void {
    this.ngxService.start();
    setTimeout(() => {
     this.ngxService.stop();
    }, 1000);
   }

}
