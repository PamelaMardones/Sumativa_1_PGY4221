import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user: User = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) { }

  register() {
    if (!this.validateEmail(this.user.email)) {
      this.presentAlert('Correo electrónico inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    this.authService.register(this.user)
      .then(() => {
        // Registro exitoso
        this.presentAlert('Registro exitoso', 'El usuario se ha creado correctamente.');
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      })
      .catch((error) => {
        // Error en el registro
        this.errorMessage = error;
      });
  }

  validateEmail(email: string): boolean {
    // Utiliza una expresión regular para validar el formato del correo electrónico
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}