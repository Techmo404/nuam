import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginPage {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {}

submit() {
  this.error = '';

  this.auth.login(this.username, this.password).subscribe({
    next: (res: any) => {
      if (res && res.access) {
        localStorage.setItem('access', res.access);
        if (res.refresh) {
          localStorage.setItem('refresh', res.refresh);
        }

        // 🔥 Llamamos al backend para obtener rol e info
        fetch('http://127.0.0.1:8000/api/me/', {
          headers: { Authorization: `Bearer ${res.access}` }
        })
        .then(resp => resp.json())
        .then(user => {
          localStorage.setItem('user', JSON.stringify(user));

          // Redirección según rol
          if (user.rol === 'ADMIN') {
            this.router.navigate(['/administrador']);
          } else {
            this.router.navigate(['/usuario']);
          }
        });
      } else {
        this.error = 'Respuesta inválida del servidor.';
      }
    },
    error: () => {
      this.error = 'Credenciales incorrectas ❌';
    }
  });
}
}
