import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private ngxService:NgxUiLoaderService){}

  ngOnInit(): void {
    this.ngxService.start();
 
    this.ngxService.stop();

  }

}
