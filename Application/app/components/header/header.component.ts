/*header.component.ts*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public title: string = 'Application Header';

  public ngOnInit(): void {
    this.initializeHeader();
  }

  private initializeHeader(): void {
    try {
      console.log('Initialisation du Header');
    } catch (error) {
      console.error('Erreur lors de l initialisation du header : ', error);
    }
  }
  
  
}
