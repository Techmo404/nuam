import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('access'); // 👈 usamos siempre 'access'

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
