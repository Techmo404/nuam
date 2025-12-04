import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NuamApiService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/`);
  }

  getCertificados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/certificados/`);
  }

  getCalificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/calificaciones/`);
  }

  getAuditorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/auditorias/`);
  }
}
