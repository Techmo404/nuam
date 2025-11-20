import { Routes } from '@angular/router';
import { Usuario } from './pages/usuario/usuario';
import { Administrador } from './pages/administrador/administrador';

export const routes: Routes = [
    {path: '', component:Usuario},
    {path: 'administrador', component:Administrador}
];
