
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NuamApiService {

  private baseUrl = 'http://127.0.0.1:8000/api';   // 🔥 Ajusta si usas otro dominio

  constructor(private http: HttpClient) {}

  // ============================================
  // 🟦 AUTENTICACIÓN
  // ============================================

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout/`, {});
  }

  // ============================================
  // 🟦 USUARIOS
  // ============================================

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios/`);
  }

  getUsuario(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/${id}/`);
  }

  createUsuario(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/`, data);
  }

  updateUsuario(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/usuarios/${id}/`, data);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/usuarios/${id}/`);
  }

  // ============================================
  // 🟦 CALIFICACIONES
  // ============================================

  getCalificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/calificaciones/`);
  }

  getCalificacion(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/calificaciones/${id}/`);
  }

  createCalificacion(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/calificaciones/`, data);
  }

  updateCalificacion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/calificaciones/${id}/`, data);
  }

  deleteCalificacion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/calificaciones/${id}/`);
  }

  // ============================================
  // 🟦 CERTIFICADOS
  // ============================================

  getCertificados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/certificados/`);
  }

  getCertificado(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/certificados/${id}/`);
  }

  createCertificado(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/certificados/`, data);
  }

  updateCertificado(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/certificados/${id}/`, data);
  }

  deleteCertificado(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/certificados/${id}/`);
  }

  // ============================================
  // 🟦 AUDITORÍAS
  // ============================================

  getAuditorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/auditorias/`);
  }

  getAuditoria(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/auditorias/${id}/`);
  }

  createAuditoria(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auditorias/`, data);
  }

  updateAuditoria(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/auditorias/${id}/`, data);
  }

  deleteAuditoria(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auditorias/${id}/`);
  }
}
