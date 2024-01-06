import { initialAdmin } from '../../types/admin';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminService } from '../admin.service';
import Admin from '../../types/admin';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  admin: Admin = { ...initialAdmin };
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  isPasswordHide = true;
  loginError = '';

  constructor(
    private router: Router,
    private adminService: AdminService,
    private auththorizationService: AuthorizationService
  ) {}

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Field is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Field is required';
    }

    return '';
  }

  getLoginErrorMessage() {
    return this.loginError;
  }

  isSubmitDisabled() {
    return this.email.errors !== null || this.password.errors !== null;
  }

  login() {
    const email = this.email.getRawValue();
    const password = this.password.getRawValue();
    if (email) {
      this.adminService.getAdminByEmail(email).subscribe((admin) => {
        if (admin && admin.password == password) {
          this.auththorizationService.identity = admin;
          this.loginError = '';
          this.router.navigate(['/employees']);
        } else {
          this.loginError = 'Invalid email or password';
        }
      });
    }
  }
}
