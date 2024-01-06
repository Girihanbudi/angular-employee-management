import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import Admin from '../types/admin';
import { AuthorizationService } from './authorization.service';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Employee Management';
  admin: Admin | undefined = undefined;

  constructor(
    private router: Router,
    private authService: AuthorizationService
  ) {
    authService.identityValue.subscribe((nextValue) => {
      this.admin = nextValue;
    });
  }

  logout() {
    this.authService.identity = undefined;
    this.router.navigate(['/']);
  }
}
