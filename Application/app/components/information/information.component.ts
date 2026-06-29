import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  @Input() person: Client | null = null; 
  @Output() goToSection = new EventEmitter<string>(); 

  // Méthode pour naviguer vers une autre section du composant
  public showSection(section: string) {
    try {
      
      // Émission de l'événement avec le nom de la section passée en paramètre
      this.goToSection.emit(section);
    } catch (error) {
      console.error('Erreur lors de la navigation');
    }
  }
  

}
