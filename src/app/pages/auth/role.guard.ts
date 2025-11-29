import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);

  const requiredRole = route.data['role'];
  const user = localStorage.getItem('user');

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const role = JSON.parse(user).rol;

  if (role !== requiredRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
