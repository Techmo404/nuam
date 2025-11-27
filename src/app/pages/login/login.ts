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
          // usamos siempre 'access', igual que el guard y el interceptor
          localStorage.setItem('access', res.access);
          if (res.refresh) {
            localStorage.setItem('refresh', res.refresh);
          }

          // si luego quieres diferenciar admin/usuario, aquí puedes leer "res.rol"
          this.router.navigate(['/usuario']);
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
