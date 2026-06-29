
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { CsvService } from './services/csv.service';
import { Client } from './models/client.model';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let csvService: CsvService;

  const mockClients: Partial<Client>[] = [
    {
      nomPartenaire: 'Client 1',
      age: 30,
      groupeAgences: 'Groupe 1'
    },
    {
      nomPartenaire: 'Client 2',
      age: 40,
      groupeAgences: 'Groupe 2'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [CsvService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    csvService = TestBed.inject(CsvService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  

  it('should load clients on init', async () => {
    spyOn(csvService, 'fetchCSV').and.returnValue(of(mockClients));

    await component.ngOnInit();

    expect(component.clients.length).toBe(2);
    expect(component.filteredResults).toEqual(mockClients as Client[]);
  });

  it('should filter results based on search term and type', () => {
    component.clients = mockClients as Client[];

    component.onSearch({ term: 'Client 1', type: 'nomPartenaire' });
    expect(component.filteredResults.length).toBe(1);
    expect(component.filteredResults[0].nomPartenaire).toBe('Client 1');

    component.onSearch({ term: '', type: 'nomPartenaire' });
    expect(component.filteredResults.length).toBe(2);
  });

  it('should select a person', () => {
    const person = mockClients[0] as Client;
    component.onPersonSelect(person);
    expect(component.selectedPerson).toEqual(person);
  });

  it('should close person details', () => {
    const person = mockClients[0] as Client;
    component.selectedPerson = person;
    component.onClosePersonDetails();
    expect(component.selectedPerson).toBeNull();
  });
});