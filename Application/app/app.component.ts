import { Client } from './models/client.model';
import { Component, OnInit } from '@angular/core';
import { CsvService } from './services/csv.service';
import { ToastrService } from 'ngx-toastr'; 
import { AuthService } from './services/auth.service';
import { LogService } from './services/LogService'; 
import { APP_CONFIG } from './app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Transformation CSCA';
  clients: Client[] = [];
  filteredResults: Client[] = [];
  selectedPerson: Client | null = null;
  isLoading: boolean = false;
  searchPerformed: boolean = false;

  constructor(
    private csvService: CsvService, 
    private authService: AuthService, 
    private toastr: ToastrService, 
    private logService: LogService 
  ) {}

  ngOnInit() { 
    this.initiateLogin();  
    this.loadClients(); 
  }

  // Lancer la connexion au démarrage
  private initiateLogin(): void {
    this.authService.login().subscribe({
      next: (response) => {
        console.log('Token:', response.token);  // Vérifier si le token est bien reçu
      },
      error: (error) => {
        //this.toastr.error('Échec de la connexion');
        this.sendLog('Échec de la connexion', 'ERROR');
        console.error('Erreur lors de la connexion:', error);
      }
    });
  }

  // Envoi de logs avec niveau de criticité et message personnalisé
  private sendLog(message: string, level: 'INFO' | 'ERROR' = 'INFO') {
    this.logService.sendLog(message, level).subscribe({
      next: () => {
        if (level === 'INFO') {
          // Log Info géré avec succès
        }
      },
      error: () => {
        // Erreur lors de l'envoi du log
      },
    });
  }

  // Méthode pour charger les clients
  loadClients() {
    try {
      this.isLoading = true;
      this.csvService.fetchCSV('assets/Outil_transfo.csv')
        .subscribe({
          next: (data) => {
            this.clients = data;
            this.filteredResults = data;
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
            //this.toastr.error('Erreur lors du chargement des clients');
            this.sendLog('Erreur lors du chargement des clients', 'ERROR');
          }
        });
    } catch (error) {
      this.isLoading = false;
      //this.toastr.error('Erreur inattendue lors du chargement des clients');
      this.sendLog('Erreur inattendue lors du chargement des clients', 'ERROR');
    }
  }

  onSearch(event: { term: string, type: string }) {
    try {
      const { term, type } = event;

      if (!term) {
        this.filteredResults = this.clients;
      } else {
        this.filteredResults = this.clients.filter(client => {
          const value = client[type as keyof Client];
          return value && value.toString().toLowerCase().includes(term.toLowerCase());
        });
      }
      this.searchPerformed = true;
    } catch (error) {
      this.toastr.error('Erreur lors de la recherche');
      this.sendLog('Erreur lors de la recherche', 'ERROR'); 
    }
  }

  onPersonSelect(person: Client) {
    try {
      this.selectedPerson = person;
    } catch (error) {
      //this.toastr.error('Erreur lors de la sélection du client');
      this.sendLog('Erreur lors de la sélection du client'); 
    }
  }

  onClosePersonDetails() {
    this.selectedPerson = null;
  }
}