import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { APP_CONFIG } from '../../app-config';

@Component({
  selector: 'app-contract-section',
  templateUrl: './contract-section.component.html',
  styleUrls: ['./contract-section.component.css']
})
export class ContractSectionComponent implements OnInit {
  @Input() person: Client | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();

  overdraft: number = 0;
  inputOverdraft: number = 0;
  prixActuelMensuel: number = 0;
  propositionsToShow: string[] = [];
  currentOfferLevel: number = 0;
  isSecuriTresorerieActive: boolean = true;
  isDebitDiffered: boolean = false;
  showTooltip: boolean = false;

  // Utilisation des avantages depuis le fichier de configuration 
  advantages = APP_CONFIG['advantages'];

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    try {
      if (this.person) {
        this.initPersonDetails();
        this.propositionsToShow = this.determinePropositionsToShow(this.person.niveauCarte);
        this.isDebitDiffered = true; 
        this.updateTotalPrice(this.propositionsToShow[this.propositionsToShow.length - 1]);
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des contrats de la personne');
    }
  }

  private initPersonDetails(): void {
    try {
      this.overdraft = this.person!.mtPlfdOcc;
      this.inputOverdraft = this.overdraft;
      this.prixActuelMensuel = this.calculerPrixActuelMensuel();
      this.currentOfferLevel = this.getOfferLevel(this.person!.niveauCarte);
      this.propositionsToShow = this.determinePropositionsToShow(this.person!.niveauCarte);

      if (this.overdraft === 0) {
        this.isSecuriTresorerieActive = false;
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des détails de la personne');
    }
  }

  // Détermine si l'offre est celle de droite (ajustez le nom de l'offre selon le cas)
  public isRightOffer(proposition: string): boolean {
    return this.propositionsToShow.length > 1 && proposition === this.propositionsToShow[this.propositionsToShow.length - 1];
  }

  // Calcul du prix actuel mensuel
  private calculerPrixActuelMensuel(): number {
    try  {
      const cotisationOGS_A = parseFloat(this.person?.cotisationOgsA?.toString() || '0');
      const cotisationOGS_Carte = parseFloat(this.person?.cotisationOgsCarte?.toString() || '0');
      return (cotisationOGS_A + cotisationOGS_Carte) / 12;
      
    } catch (error) {
      console.error('Erreur lors du calcul du prix actuel mensuel');
      return 0;
    }
  }

  public getDifferenceWithCurrentPrice(proposition: string): number {
    try {
      const propositionPrice = this.getTotalPrice(proposition);
      return propositionPrice - this.prixActuelMensuel;
    } catch (error) {
      console.error('Erreur lors du calcul de la différence de prix');
      return 0;
    }
  }

  // Récupère le signe de la différence (positif ou négatif)
  public getDifferenceSign(proposition: string): string {
    try {
      const difference = this.getTotalPrice(proposition) - this.prixActuelMensuel;
      return difference >= 0 ? '+' : '';
    } catch (error) {
      console.error('Erreur lors du calcul du signe de la différence');
      return '';
    }
  }

  // Détermine le niveau de l'offre en fonction du libellé
  private getOfferLevel(offer: string): number {
    if (offer.startsWith('1.SUPER PREMIUM')) {
      return 3;
    } else if (offer.startsWith('2.PREMIUM')) {
      return 2;
    } else {
      return 1;
    }
  }

  // Affiche ou cache l'info-bulle sur le tarif
  private onTarifHover(show: boolean): void {
    this.showTooltip = show;
  }

  // Détermine les propositions à afficher en fonction du niveau de la carte
  private determinePropositionsToShow(niveauCarte: string): string[] {
    switch (niveauCarte) {
      case '1.SUPER PREMIUM':
        return ['Prestige'];
      case '2.PREMIUM':
        return ['Premium', 'Prestige'];
      case '3.STANDARD':
        return ['Essentiel', 'Premium'];
      default:
        return ['Essentiel', 'Premium'];
    }
  }

  // Gestion de la modification du montant du découvert autorisé
  public handleInputChange(event: Event): void {
    try {
        const target = event.target as HTMLInputElement;
        this.inputOverdraft = parseFloat(target.value);

        if (this.inputOverdraft > 0) {
            this.isSecuriTresorerieActive = true;
        } else {
            this.isSecuriTresorerieActive = false;
        }
    } catch (error) {
      console.error('Erreur lors du changement du montant du découvert');
    }
  }

  // Gestion de la soumission du formulaire de modification du découvert
  public handleSubmit(event: Event): void {
    try {
        event.preventDefault();
        this.overdraft = this.inputOverdraft;
        if (this.person) {
            this.person.mtPlfdOcc = this.overdraft;
            this.updateTotalPrice(this.propositionsToShow[0]);
            if (this.overdraft === 0) {
                this.isSecuriTresorerieActive = false;
            }
        }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du montant du découvert');
    }
  }

  // Retourne le prix de base pour chaque proposition
  private getBasePrice(proposition: string): number {
    switch (proposition) {
      case 'Essentiel': return 10.5;
      case 'Premium': return 15;
      case 'Prestige': return 33;
      default: return 0;
    }
  }

    // Calcule le prix de Sécuri Trésorerie
    private getSecuriTresoreriePrice(): number {
      try {
        if (this.overdraft <= 500) {
          return 1.35;
        } else if (this.overdraft <= 2000) {
          return 2;
        } else {
          return 3;
        }
      } catch (error) {
        console.error('Erreur lors du calcul du prix de Sécuri Trésorerie');
        return 0;
      }
    }

  // Calcule le prix total pour chaque proposition en incluant Sécuri Trésorerie si activée
  public getTotalPrice(proposition: string): number {
    try {
      const basePrice = this.getBasePrice(proposition);
      const secuTresPrice = this.isSecuriTresorerieActive ? this.getSecuriTresoreriePrice() : 0;
  
      let totalPrice = basePrice;
  
      if (this.isDebitDiffered && this.isRightOffer(proposition)) {
        totalPrice *= 0.7; // Réduction de 30%
      }
  
      totalPrice += secuTresPrice;
      return totalPrice;
    } catch (error) {
      console.error('Erreur lors du calcul du prix total');
      return 0;
    }
  }

// Met à jour le prix total après une modification
  public updateTotalPrice(proposition: string): void {
    try {
      if (this.person) {
        this.prixActuelMensuel = this.calculerPrixActuelMensuel();
        const totalPrice = this.getTotalPrice(proposition);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du prix total');
    }
  }

  // Retourne l'image associée à une proposition
  public getImageForProposition(proposition: string): string {
    switch (proposition) {
      case 'Essentiel':
        return 'assets/images/essentiel.png';
      case 'Premium':
        return 'assets/images/premium.png';
      case 'Prestige':
        return 'assets/images/prestige.png';
      default:
        return '';
    }
  }

  // Gère la fermeture de la section de contrat
  private onClose() {
    try {
      this.close.emit();
    } catch (error) {
      console.error('Erreur lors de la fermeture de la section de contrat');
    }
  }

  // Gère le retour en arrière dans la navigation
  public onGoBack() {
    try {
      this.goBack.emit();
    } catch (error) {
      console.error('Erreur lors du retour en arrière');
    }
  }

  // Récupère les avantages associés à chaque proposition
  public getAdvantagesForProposition(proposition: string): string[] {
    try {
      return this.advantages[proposition] || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des avantages pour la proposition');
      return [];
    }
  }
}