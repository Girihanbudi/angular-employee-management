import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthorizationService } from './authorization.service';

export const auth1Guard: CanActivateFn = (route, state) => {
  const authService = inject(AuthorizationService);
  const router = inject(Router);

  if (authService.identity) {
    router.navigate(['/employees']);
    return false;
  } else {
    return true;
  }
};
