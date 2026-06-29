import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  constructor(private http: HttpClient, private toastr: ToastrService,) {}

  fetchCSV(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(data => this.parseCSV(data)),
      catchError(error => {
        this.toastr.error('Erreur lors de la récupération du fichier CSV', 'Erreur', {tapToDismiss:false , timeOut:100000, closeButton:true});
        console.error('Erreur lors de la récupération du fichier CSV', error);
        return throwError(error);
      })
    );
  }

  private parseCSV(data: string): any[] {
    try {

      // Diviser les lignes en prenant en compte \\r\\n ou \\n
      const lines = data.split(/\r\n/);
      const headers = lines[0].split(';').map(header => header.trim());

      const result = lines.slice(1).map(line => {
        // Ignorer les lignes vides
        if (line.trim() === '') return null; 
        const obj: any = {};
        const currentline = line.split(';').map(item => item.trim());
        // Ajout de log pour vérifier chaque ligne 

        headers.forEach((header, index) => {
          obj[header] = currentline[index] ? currentline[index] : '';
        });

        return obj;
      }).filter(item => item !== null);  
      return result;

    } catch (error) {
      this.toastr.error('Erreur lors du traitement des données CSV', 'Erreur');
      console.error('Erreur lors du traitement des données CSV', error);
      return [];
    }
  }
}