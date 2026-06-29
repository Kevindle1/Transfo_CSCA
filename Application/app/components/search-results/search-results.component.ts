import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Client } from '../../models/client.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { LogService } from '../../services/LogService';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Input() results: Client[] = [];
  @Output() personSelect = new EventEmitter<Client>();

  currentPage: number = 1;
  clientsPerPage: number = 6;
  totalPages: number = 1;
  message: string = '';
  originalResults: Client[] = [];
  noResults: boolean = false; // Indicateur d'absence de résultats

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private logService: LogService
  ) {}

  ngOnInit() {
    try {
      this.originalResults = [...this.results];
      this.updateTotalPages();
    } catch {
      const errorMessage = 'Erreur lors de l\'initialisation du composant SearchResultsComponent.';
      this.toastr.error(errorMessage, 'Erreur d\'initialisation');
      this.sendLog(errorMessage, 'ERROR');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      if (changes['results']) {
        this.updateTotalPages();
      }
    } catch {
      const errorMessage = 'Erreur lors de la détection des changements dans les résultats de recherche.';
      this.toastr.error(errorMessage, 'Erreur de changement');
      this.sendLog(errorMessage, 'ERROR');
    }
  }

  updateTotalPages() {
    try {
      this.totalPages = Math.ceil(this.results.length / this.clientsPerPage);
    } catch {
      const errorMessage = 'Erreur lors du calcul du nombre total de pages.';
      this.toastr.error(errorMessage, 'Erreur de pagination');
      this.sendLog(errorMessage, 'ERROR');
    }
  }

  get paginatedResults() {
    try {
      const startIndex = (this.currentPage - 1) * this.clientsPerPage;
      const paginated = this.results.slice(startIndex, startIndex + this.clientsPerPage);
      return paginated;
    } catch {
      const errorMessage = 'Erreur lors de l\'extraction des résultats paginés.';
      this.toastr.error(errorMessage, 'Erreur d\'affichage');
      this.sendLog(errorMessage, 'ERROR');
      return [];
    }
  }

  selectPerson(person: Client) {
    try {
      this.personSelect.emit(person);
      this.sendLog(`Personne sélectionnée : ${person.nom}`, 'INFO');
    } catch {
      const errorMessage = 'Erreur lors de la sélection du client.';
      this.sendLog(errorMessage, 'ERROR');
    }
  }

  changePage(page: number) {
    try {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      } else {
        const errorMessage = `Page invalide : ${page}. Total pages : ${this.totalPages}.`;
        this.toastr.warning(errorMessage, 'Changement de page invalide');
        this.sendLog(errorMessage, 'ERROR');
      }
    } catch {
      const errorMessage = 'Erreur lors du changement de page.';
      this.toastr.error(errorMessage, 'Erreur de pagination');
      this.sendLog(errorMessage, 'ERROR');
    }
  }

  onSearch(event: { term: string, type: string }) {
    try {
      const { term, type } = event;
      this.results = this.originalResults.filter(client => {
        const field = client[type as keyof Client];
        if (typeof field === 'string') {
          return field.toLowerCase().includes(term.toLowerCase());
        }
        return false;
      });
      
      this.noResults = this.results.length === 0;
      
      if (this.noResults) {
        this.toastr.info('Aucun résultat trouvé. Veuillez essayer une autre recherche.', 'Pas de résultats');
      } else if (type === 'AGENCE_GESTIONNAIRE' || type === 'Conseiller') {
        this.message = `Il y a ${this.results.length} compte(s) client à transformer.`;
      } else {
        this.message = '';
      }
    } catch {
      const errorMessage = `Erreur lors de la recherche avec le terme "${event.term}" et le type "${event.type}".`;
      this.toastr.error(errorMessage, 'Erreur de recherche');
      this.sendLog(errorMessage, 'ERROR');
    }
  }

  private sendLog(message: string, level: 'INFO' | 'ERROR' = 'INFO') {
    this.logService.sendLog(message, level).subscribe({
      next: () => {
        if (level === 'ERROR') {
          this.toastr.error('Une erreur a été enregistrée dans les logs', 'Erreur');
        }
      },
      error: () => {
        this.toastr.error('Impossible d\'envoyer le log.', 'Erreur de log');
      }
    });
  }
}