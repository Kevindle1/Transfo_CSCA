import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'https://top10-clwnetqua.ca-technologies.fr/apicr831/v1/authentication/login'; // URL de l'API d'authentification

  constructor(private http: HttpClient) {}

   // Méthode pour récupérer le token depuis l'API
   login(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Peri831-Caisse-Regionale': 'CR Toulouse 31',
      'Peri831-Habilitations-Cadif-Id': 'TransformationCsca',
      'Peri831-Inventaire-Id':'5482'
    });

    return this.http.post(this.apiURL, null, { headers, withCredentials: true }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Stocker le token dans le localStorage
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  // Méthode pour récupérer le token stocké dans localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem('authToken');
  }
}