import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuamApiService } from '../../nuam-api.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css'],
  imports: [CommonModule]
})
export class Usuario implements OnInit {

  certificados: any[] = [];
  usuarioActual: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private api: NuamApiService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // cargamos usuario guardado en localStorage
    this.usuarioActual = this.auth.getCurrentUser();

    // petición a /api/certificados/
    this.api.getCertificados().subscribe({
      next: (data) => {
        if (this.usuarioActual && this.usuarioActual.id) {
          // filtrar certificados por usuario
          this.certificados = data.filter(
            (c: any) => c.usuario === this.usuarioActual.id
          );
        } else {
          this.certificados = data;
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los certificados.';
        this.loading = false;
      }
    });
  }

  // 🔥 NECESARIO PARA EL BOTÓN DE CERRAR SESIÓN
  logout() {
    this.auth.logout();
  }
}
