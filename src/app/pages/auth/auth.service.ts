import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  // login al endpoint JWT de Django
  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/token/`, { username, password });
  }

  // guarda info de sesión
  saveSession(access: string, refresh: string) {
    localStorage.setItem('access', access);
    if (refresh) {
      localStorage.setItem('refresh', refresh);
    }
  }

  // guarda el usuario que viene desde /me/
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser() {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  getRole() {
    const user = this.getCurrentUser();
    return user?.rol;
  }

  getMe() {
    // el interceptor añadirá el Authorization automáticamente
    return this.http.get(`${this.apiUrl}/me/`);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access');
  }
}
