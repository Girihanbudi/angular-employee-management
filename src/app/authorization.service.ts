import { Injectable, inject } from '@angular/core';
import Admin from '../types/admin';
import { BehaviorSubject } from 'rxjs';

const accessTokenKey = '_Secure.at';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  identityValue = new BehaviorSubject(this.identity);

  set identity(admin: Admin | undefined) {
    this.identityValue.next(admin); // this will make sure to tell every subscriber about the change.
    localStorage.setItem(accessTokenKey, JSON.stringify(admin));
  }

  get identity() {
    const data = localStorage.getItem(accessTokenKey);
    if (!data) return undefined;
    else {
      if (data === 'undefined') return undefined;
      return JSON.parse(data) as Admin;
    }
  }
}
