import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';
import { auth1Guard } from './auth-1.guard';
import { auth2Guard } from './auth-2.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [auth1Guard] },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [auth2Guard],
  },
  {
    path: 'employees/add',
    component: EmployeeComponent,
    canActivate: [auth2Guard],
  },
  {
    path: 'employees/:id',
    component: EmployeeComponent,
    canActivate: [auth2Guard],
  },
  { path: '**', redirectTo: '/login' },
];
