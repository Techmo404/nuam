import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuamApiService } from '../../nuam-api.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-administrador',
  standalone: true,
  templateUrl: './administrador.html',
  styleUrls: ['./administrador.css'],
  imports: [CommonModule]
})
export class Administrador implements OnInit {

  // 🔥 CONTADORES
  countUsuarios: number = 0;
  countEmpleados: number = 0;
  countAuditorias: number = 0;
  countCertificados: number = 0;

  // 🔥 TABLAS
  usuarios: any[] = [];
  auditorias: any[] = [];
  certificados: any[] = [];

  loading: boolean = true;
  error: string = '';

  constructor(
    private api: NuamApiService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarAuditorias();
    this.cargarCertificados();
  }

  // ================================
  // 🔵 1. USUARIOS
  // ================================
  cargarUsuarios() {
    this.api.getUsuarios().subscribe({
      next: (data: any[]) => {
        this.usuarios = data;
        this.countUsuarios = data.length;
        this.countEmpleados = data.filter(u => u.rol === 'empleado').length;
      },
      error: () => {
        this.error = 'No se pudieron cargar los usuarios.';
      }
    });
  }

  // ================================
  // 🟣 2. AUDITORÍAS
  // ================================
  cargarAuditorias() {
    this.api.getAuditorias().subscribe({
      next: (data: any[]) => {
        this.auditorias = data;
        this.countAuditorias = data.length;
      },
      error: () => {
        this.error = 'No se pudieron cargar auditorías.';
      }
    });
  }

  // ================================
  // 🟢 3. CERTIFICADOS
  // ================================
  cargarCertificados() {
    this.api.getCertificados().subscribe({
      next: (data: any[]) => {
        this.certificados = data;
        this.countCertificados = data.length;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar certificados.';
        this.loading = false;
      }
    });
  }

  // ================================
  // 🚪 LOGOUT
  // ================================
  logout() {
    this.auth.logout();
  }
}
