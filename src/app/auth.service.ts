import { Injectable } from '@angular/core';
import { User } from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registeredUsers: User[] = [];
  private loggedInUser: User | null = null;

  constructor() { }

  register(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      const existingUser = this.registeredUsers.find(u => u.email === user.email);
      if (existingUser) {
        reject('El usuario ya está registrado');
        return;
      }

      this.registeredUsers.push(user);
      resolve('Registro exitoso');
    });
  }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const user = this.registeredUsers.find(u => u.email === email && u.password === password);
      if (user) {
        this.loggedInUser = user;
        resolve('Inicio de sesión exitoso');
      } else {
        reject('Credenciales inválidas');
      }
    });
  }

  
  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  logout() {
    this.loggedInUser = null;
  }
}