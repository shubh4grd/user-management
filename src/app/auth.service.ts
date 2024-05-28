import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];

  constructor() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    } else {
      this.users = [
        { username: 'admin', password: 'admin', role: 'Admin' },
        { username: 'supervisor', password: 'supervisor', role: 'Supervisor' },
        { username: 'worker', password: 'worker', role: 'Worker' }
      ];
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(user: User): boolean {
    if (this.users.find(existingUser => existingUser.username === user.username)) {
      return false; // User with the same username already exists
    }
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    const currentUser:any = this.getCurrentUser();
    return currentUser && currentUser.role === 'Admin';
  }

  isSupervisor(): boolean {
    const currentUser:any = this.getCurrentUser();
    return currentUser && currentUser.role === 'Supervisor';
  }

  isWorker(): boolean {
    const currentUser:any = this.getCurrentUser();
    return currentUser && currentUser.role === 'Worker';
  }

  addUser(user: User): boolean {
    if (this.users.find(existingUser => existingUser.username === user.username)) {
      return false; // User with the same username already exists
    }
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  removeUser(username: string): void {
    this.users = this.users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUsers(): User[] {
    return this.users;
  }
}
