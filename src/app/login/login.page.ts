import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

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
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}

  login() {
    const { email, password } = this.loginUser;

    this.authService.login(email, password)
      .then(() => {
        const loggedInUser = this.authService.getLoggedInUser();
        if (loggedInUser) {
          this.presentWelcomeAlert(loggedInUser.email);
        }
      })
      .catch(error => {
        console.log('Error al iniciar sesión:', error);
        this.presentLoginErrorAlert();
      });
  }

  goToRegisterPage() {
    this.router.navigate(['/register']); // Redireccionar a la página de registro
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