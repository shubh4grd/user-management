// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = 'Worker';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const user: User = { username: this.username, password: this.password, role: this.role };
    if (this.authService.register(user)) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Registration failed. User might already exist.';
    }
  }
}
