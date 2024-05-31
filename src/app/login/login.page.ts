import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string="";
  password: string="";

  constructor(private AlertController: AlertController, private router:Router) { }

  ngOnInit() {
  }

  login() {
    if (this.usuario.trim() === "los3" && this.password.trim() === "123456") {
      this.presentAlert("Login correcto", "Bienvenido al sistema");
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.usuario,
          password: this.password,
        }
      };
      this.router.navigate(['/calculator'], navigationExtras);
    } else {
      this.presentAlert("Error", "Usuario o contraseña incorrectos");
    }
  }

  async presentAlert(header:string, message: string) {
    const alert = await this.AlertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}

