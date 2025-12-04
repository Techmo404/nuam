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

  // 🔐 Datos del usuario logueado
  usuarioActual: any = null;

  // 📊 Contadores del panel
  countCalificaciones: number = 0;
  countCertificados: number = 0;
  countCertificadosValidados: number = 0;

  constructor(
    private api: NuamApiService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Cargar datos del usuario en LocalStorage
    this.usuarioActual = JSON.parse(localStorage.getItem('user') || '{}');

    // 1) Calificaciones
    this.api.getCalificaciones().subscribe({
      next: (data: any[]) => {
        this.countCalificaciones = data.length;
      }
    });

    // 2) Certificados
    this.api.getCertificados().subscribe({
      next: (data: any[]) => {
        this.countCertificados = data.length;

        // 🔥 Simulamos certificados validados (solo los que tienen archivo)
        this.countCertificadosValidados = data.filter(c => c.archivo_pdf).length;
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
