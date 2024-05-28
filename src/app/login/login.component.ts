import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = ''; // Clear any existing error message

    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    if (this.authService.login(this.username, this.password)) {
      const currentUser: any = this.authService.getCurrentUser();
      if (currentUser.role === 'Admin' || currentUser.role === 'Supervisor') {
        this.router.navigate(['/dashboard']);
      } else if (currentUser.role === 'Worker') {
        this.router.navigate(['/capture']);
      }
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}