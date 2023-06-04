import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login:any={
    Usuario: "",
    Password:""
  }
  field:string="";
  user1: string = "Pamela Mardones";
  clave1: string = "1234";

  constructor(public toastController: ToastController, private router: Router) {}
  ngOnInit() {}

  limpiar(){
    for (var [key, value] of Object.entries(this.login)) {
      Object.defineProperty(this.login,key,{value:""})
    }
  }

  ingresar(){
    if(this.login.Usuario == this.user1 && this.login.Password == this.clave1 ){
      this.presentToast("Bienvenido (a) "+ this.user1);
    }
    else{
      this.presentToast("Usuario y/o contraseña incorrecta");
    }
  }
  validateModel(model:any){
    for (var [key, value] of Object.entries(model)) {
      if (value=="") {
        this.field=key;
        return false;
      }
    }
    return true;
  }
 
    /**
   * Muestra un toast al usuario
   * @param message Mensaje a presentar al usuario
   * @param duration Duración el toast, este es opcional
   */
  
    async presentToast(message:string, duration?:number){
      const toast = await this.toastController.create(
        {
          message:message,
          duration:duration?duration:2000
        }
      );
      toast.present();
    }
  }


