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

  usuarios: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private api: NuamApiService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.api.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los usuarios.';
        this.loading = false;
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
