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
          // 1) guardar tokens
          this.auth.saveSession(res.access, res.refresh);

          // 2) pedir info del usuario logueado
          this.auth.getMe().subscribe({
            next: (user: any) => {
              this.auth.saveUser(user);

              // 3) redirigir según rol
              if (user.rol === 'ADMIN') {
                this.router.navigate(['/administrador']);
              } else {
                this.router.navigate(['/usuario']);
              }
            },
            error: () => {
              this.error = 'No se pudo obtener la información del usuario.';
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
