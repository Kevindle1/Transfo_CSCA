import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logUrl = 'https://top10-clwnetqua.ca-technologies.fr/apicr831/v1/peri/logging/events';

  constructor(private http: HttpClient) {}

  sendLog(message: string, level: 'INFO' | 'ERROR' = 'INFO'): Observable<any> {
    const logData = {
      additionalDetails: level === 'INFO' ? 'Succès' : 'Erreur',
      applicationName: APP_CONFIG['applicationName'],
      inventaireId: APP_CONFIG['inventaireId'],
      message: message,
      version: APP_CONFIG['version'],
      entryDate: new Date().toISOString(),
      criticityLevel: level
    };

    const token = localStorage.getItem('authToken');
    console.log('Auth Token :', token);
    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.logUrl, logData, { headers });
  }
}