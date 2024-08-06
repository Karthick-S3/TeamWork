import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  constructor(private ngxService:NgxUiLoaderService){}

  ngOnInit():void {
    this.ngxService.start();
    this.ngxService.stop();
  }

}
