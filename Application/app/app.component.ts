import { Client } from './models/client.model';
import { Component, OnInit } from '@angular/core';
import { CsvService } from './services/csv.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadClients();
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
            console.error('Erreur lors du chargement des clients');
          }
        });
    } catch (error) {
      this.isLoading = false;
      console.error('Erreur inattendue lors du chargement des clients', error);
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
      console.error('Erreur lors de la recherche', error);
    }
  }

  onPersonSelect(person: Client) {
    try {
      this.selectedPerson = person;
    } catch (error) {
      console.error('Erreur lors de la sélection du client', error);
    }
  }

  onClosePersonDetails() {
    this.selectedPerson = null;
  }
}
