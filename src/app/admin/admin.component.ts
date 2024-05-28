import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  newUser: User = { username: '', password: '', role: 'Worker' };
  isAdmin: boolean = false;
  isSupervisor: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
    const currentUser = this.authService.getCurrentUser();
    this.isAdmin = currentUser?.role === 'Admin';
    this.isSupervisor = currentUser?.role === 'Supervisor';
  }

  loadUsers() {
    this.users = this.authService.getUsers();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addUser() {
    if (!this.isAdmin) {
      alert('Only Admin users can add new users');
      return;
    }
    if (!this.newUser.username || !this.newUser.password || !this.newUser.role) {
      alert('Please fill out all fields');
      return;
    }
    if (this.authService.addUser({ ...this.newUser })) {
      this.loadUsers(); // Refresh the user list
      this.newUser = { username: '', password: '', role: 'Worker' }; // Reset form fields
    } else {
      alert('Username already exists');
    }
  }

  removeUser(username: string) {
    if (!this.isAdmin) {
      alert('Only Admin users can remove users');
      return;
    }
    this.authService.removeUser(username);
    this.loadUsers(); // Refresh the user list
  }
}
