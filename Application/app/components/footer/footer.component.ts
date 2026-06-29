import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    try {
      // Initialisation du composant footer, code futur pourrait être ajouté ici.
      console.log('FooterComponent initialisé avec succès');
    } catch (error) {
      // Gestion des erreurs lors de l'initialisation du composant
      console.error('Erreur lors de l\'initialisation du FooterComponent :');
    }
  }
}
