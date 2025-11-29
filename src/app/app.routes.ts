import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { Usuario } from './pages/usuario/usuario';
import { Administrador } from './pages/administrador/administrador';
import { authGuard } from './pages/auth/auth.guard';
import { roleGuard } from './pages/auth/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginPage },

  {
    path: 'usuario',
    component: Usuario,
    canActivate: [authGuard, roleGuard],
    data: { role: 'EMPLEADO' }
  },

  {
    path: 'administrador',
    component: Administrador,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }
  },

  { path: '**', redirectTo: 'login' },
];
