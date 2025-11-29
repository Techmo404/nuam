import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/token/`, { username, password });
  }

  saveSession(access: string, refresh: string, user: any) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getRole() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.rol;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access');
  }
}
