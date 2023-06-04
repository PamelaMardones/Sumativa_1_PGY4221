import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit{
    usuario: String | undefined;
    niveles:any[]=[
      {id:1,nivel:"Basica Incompleta"},
      {id:2,nivel:"Basica Completa"},
      {id:3,nivel:"Media Incompleta"},
      {id:4,nivel:"Media Completa"},
      {id:5,nivel:"Media Incompleta"},
      {id:6,nivel:"Superior Completa"}
    ]
    data:any={
      nombre:"",
      apellido:"",
      educacion:"",
      nacimiento:"",
      email:"",
      password:""
    };
    field:string="";
    constructor(public toastController: ToastController) {}
    ngOnInit() {}

    validateModel(model:any){
      for (var [key, value] of Object.entries(model)) {
        if (value=="") {
          this.field=key;
          return false;
        }
      }
      return true;
    }

    limpiar(){
      for (var [key, value] of Object.entries(this.data)) {
        Object.defineProperty(this.data,key,{value:""})
      }
    }
    registrar(){
      if(this.validateModel(this.data)){
        this.presentToast("Cuenta creada exitosamente, su usuario es: "+this.data.nombre+" "+this.data.apellido);
      }
      else{
        this.presentToast("Falta: "+this.field);
      }
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
      duration:duration?duration:3000
    }
  );
  toast.present();
    }
}
  

    

   



