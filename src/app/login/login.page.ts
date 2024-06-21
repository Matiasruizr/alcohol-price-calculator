import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbTaskService } from '../db-task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string="";
  password: number | null = null;
  active_session: string | null | void = "no";

  constructor(private AlertController: AlertController, private router:Router, private dbService: DbTaskService) {
  }

  ngOnInit() {
    this.presentAlert("Bienvenido", "Por favor inicie sesión")

    this.active_session = localStorage.getItem('active_session');

    if (this.active_session === 'si') {
      this.router.navigate(['/home']);
    }
  }

  async login() {
    const userFromDb = await this.dbService.validateUser(this.usuario, this.password);

    if (userFromDb) {
      this.presentAlert("Login correcto", "Bienvenido al sistema");
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.usuario,
          password: this.password,
        }
      };
      this.dbService.updateSession(this.usuario, 1);
      this.active_session = 'si';
      localStorage.setItem('user', this.usuario);
      localStorage.setItem('active_session', 'si');
      this.router.navigate(['/home'], navigationExtras);
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

