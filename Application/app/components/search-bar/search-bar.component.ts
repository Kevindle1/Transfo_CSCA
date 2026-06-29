import { Component, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LogService } from '../../services/LogService';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  constructor(
    private toastr: ToastrService,
    private logService: LogService
  ) {}

  // Terme de recherche saisi par l'utilisateur
  searchTerm: string = ''; 
  
  // Type de recherche par défaut
  searchType: string = 'nomPartenaire'; 

  @Output() search: EventEmitter<{ term: string, type: string }> = new EventEmitter<{ term: string, type: string }>();

  // Méthode déclenchée lors du clic sur le bouton de recherche ou la touche Entrée
  public onSearch() {
    try {
      if (this.searchTerm.length < 2 ) {
        this.toastr.error('Veullez saisir au moins deux caractères pour effectuer une recherche.');
        return;
      }
      // Validation des critères de recherche en fonction du type sélectionné
      if (!this.validateSearchCriteria()) {
        return; // Si la validation échoue, on arrête la recherche
      }

      // Émission de l'événement de recherche avec le terme et le type
      this.search.emit({ term: this.searchTerm, type: this.searchType });
    } catch (error) {
      this.sendLog("Erreur lors de l'émission de l'événement de recherche", 'ERROR');
      this.toastr.error("Une erreur est survenue lors de la recherche.");
    }
  }

  // Validation des critères en fonction du type de recherche
  private validateSearchCriteria(): boolean {
    switch (this.searchType) {
      case 'nomPartenaire':
        if (!/^[a-zA-Z\s]*$/.test(this.searchTerm)) {
          this.toastr.error("Le nom du partenaire ne doit contenir que des lettres.");
          this.sendLog("Erreur: Le nom du partenaire contient des caractères invalides", 'ERROR');
          return false;
        }
        break;
      case 'agenceGestionnaire':
        this.searchTerm = this.searchTerm.replace(/'/g, ' '); // Retire les apostrophes
        if (!/^[a-zA-Z\s]*$/.test(this.searchTerm)) {
          this.toastr.error("L'agence ne doit contenir que des lettres.");
          this.sendLog("Erreur: L'agence contient des caractères invalides", 'ERROR');
          return false;
        }
        break;
      case 'dav':
        if (!/^\d+$/.test(this.searchTerm)) {
          this.toastr.error("Le champ DAV doit contenir uniquement des chiffres.");
          this.sendLog("Erreur: DAV contient des caractères non numériques", 'ERROR');
          return false;
        }
        break;
      case 'conseiller':
        if (!/^[a-zA-Z\s]*$/.test(this.searchTerm)) {
          this.toastr.error("Le champ Conseiller ne doit contenir que des lettres.");
          this.sendLog("Erreur: Conseiller contient des caractères invalides", 'ERROR');
          return false;
        }
        break;
      default:
        this.toastr.error("Type de recherche inconnu.");
        this.sendLog("Erreur: Type de recherche inconnu", 'ERROR');
        return false;
    }
    return true;
  }

  // Méthode pour détecter la touche Entrée
  public onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  // Envoi de logs avec niveau de criticité et message personnalisé
  private sendLog(message: string, level: 'INFO' | 'ERROR' = 'INFO') {
    this.logService.sendLog(message, level).subscribe({
      error: () => this.toastr.error("Une erreur est survenue lors de l'envoi des logs.")
    });
  }
}