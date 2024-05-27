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

  constructor(private authService: AuthService, private router : Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const users = localStorage.getItem('users');
    this.users = users ? JSON.parse(users) : [];
  }  

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  addUser() {
    if (!this.newUser.username || !this.newUser.password || !this.newUser.role) {
      alert('Please fill out all fields');
      return;
    }
    this.users.push({ ...this.newUser });
    localStorage.setItem('users', JSON.stringify(this.users));
    this.newUser = { username: '', password: '', role: 'Worker' };
  }

  removeUser(username: string) {
    this.users = this.users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
