import { Injectable } from '@angular/core';
import Admin from '../types/admin';
import adminList from '../mock/mock-admins';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  getAdminById(id: number): Observable<Admin | undefined> {
    const admin = of(adminList.find((admin) => admin.id === id));
    return admin;
  }

  getAdminByEmail(email: string): Observable<Admin | undefined> {
    const admin = of(adminList.find((admin) => admin.email === email));
    return admin;
  }
}
