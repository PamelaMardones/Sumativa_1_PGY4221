import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginUser = {
    email: '',
    password: ''
  };
  loginErrorMessage = '';

  constructor(
    private databaseService: DatabaseService,
    private alertController: AlertController
  ) {}

  login() {
    const { email, password } = this.loginUser;

    this.databaseService.getUserByEmail(email).then(user => {
      if (user && user.password === password) {
        this.presentWelcomeAlert(user.email);
      } else {
        this.presentLoginErrorAlert();
      }
    });
  }

  async presentWelcomeAlert(username: string) {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: `¡Hola, ${username}! Has iniciado sesión correctamente.`,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentLoginErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error de inicio de sesión',
      message: 'El email o la contraseña son incorrectos. Por favor, verifica tus credenciales.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}