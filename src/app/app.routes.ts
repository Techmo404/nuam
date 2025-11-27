import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { Usuario } from './pages/usuario/usuario';
import { Administrador } from './pages/administrador/administrador';
import { authGuard } from './pages/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'usuario', component: Usuario, canActivate: [authGuard] },
  { path: 'administrador', component: Administrador, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];
