import { Injectable, inject } from '@angular/core';
import Admin from '../types/admin';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  cookieService = inject(CookieService);

  createAccessToken() {
    const expires = new Date();
    this.cookieService.set(
      '_Secure.at',
      uuidv4(),
      expires.setDate(expires.getDay() + 30)
    );
  }
}
