import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';

export const auth2Guard: CanActivateFn = (route, state) => {
  const authService = inject(AuthorizationService);
  const router = inject(Router);

  if (!authService.identity) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
