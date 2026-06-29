import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../../models/client.model';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PersonDetailsComponent {
  @Input() person: Client | null = null;
  @Output() close = new EventEmitter<void>();

  currentSection: string = 'informations'; 

  public onClose() {
    this.close.emit();
  }

  public showSection(section: string) {
    this.currentSection = section;
  }

  public onGoBack() {
    this.showSection('informations'); 
  }
}
