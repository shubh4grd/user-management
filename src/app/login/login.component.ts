// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  errorMessage!: string;
  passwordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) {}


  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}

