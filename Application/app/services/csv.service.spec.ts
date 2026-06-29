import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CsvService } from './csv.service';

describe('CsvService', () => {
  let service: CsvService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsvService]
    });
    service = TestBed.inject(CsvService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
it('should load the CSV from assets and contain more than 100 clients', (done: DoneFn) => {
  const csvUrl = 'assets/Outil_transfo.csv'; 

  service.fetchCSV(csvUrl).subscribe(data => {
    expect(data.length).toBeGreaterThan(100); 
  });

  const req = httpTestingController.expectOne(csvUrl);
  expect(req.request.method).toBe('GET');

  // On laisse la requête faire son travail, on ne simule pas de réponse ici.
  req.flush(null); 
  
  httpTestingController.verify();
});
});