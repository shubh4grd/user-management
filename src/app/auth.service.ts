import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { username: 'admin', password: 'admin', role: 'Admin' },
    { username: 'supervisor', password: 'supervisor', role: 'Supervisor' },
    { username: 'worker', password: 'worker', role: 'Worker' }
  ];

  constructor() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.saveUsers();
    }
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  login(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(user: User): boolean {
    if (this.users.find(existingUser => existingUser.username === user.username)) {
      return false;
    }
    this.users.push(user);
    this.saveUsers();
    return true;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isAdmin() {
    const currentUser = this.getCurrentUser();
    return currentUser && currentUser.role === 'Admin';
  }

  isSupervisor() {
    const currentUser = this.getCurrentUser();
    return currentUser && currentUser.role === 'Supervisor';
  }

  isWorker() {
    const currentUser = this.getCurrentUser();
    return currentUser && currentUser.role === 'Worker';
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): boolean {
    if (this.users.find(existingUser => existingUser.username === user.username)) {
      return false;
    }
    this.users.push(user);
    this.saveUsers();
    return true;
  }

  removeUser(username: string) {
    this.users = this.users.filter(user => user.username !== username);
    this.saveUsers();
  }

  updateUserRole(username: string, role: string) {
    const user = this.users.find(u => u.username === username);
    if (user) {
      user.role = role;
      this.saveUsers();
    }
  }
}
