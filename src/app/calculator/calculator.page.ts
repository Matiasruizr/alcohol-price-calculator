import {Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { categories } from '../../assets/data/categories';

@Component({
  selector: 'app-home',
  templateUrl: 'calculator.page.html',
  styleUrls: ['calculator.page.scss'],
})
export class CalculatorPage {
  user: string = ""
  net_value: number = 0
  category: string = ""
  categories = categories;
  sell_price: number = 0;
  price_with_margin: number = 0;
  price_with_specific_tax: number = 0;
  iva: number = 1.19;

  private titleAnimaton: Animation = {} as Animation;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private AlertController: AlertController,
    private animationCtrl: AnimationController,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras?.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.["user"];
      }
    });
  }

  ngAfterViewInit() {
    // Validate  if user exist, otherwise return error and redirect to login
    if (!this.user) {
      this.presentAlert("Usuario no encontrado", "Porfavor inicia sesión");
      this.router.navigate(['/login']);
    }
    const element = document.querySelector('#welcome_text') as HTMLElement;
    this.titleAnimaton =  this.leftToRightAnimation(element)
    this.titleAnimaton.play();
  }


  clean() {
    this.net_value = 0;
    this.category = "";
  }

  calculate() {
    const category = this.categories.find((element) => element.name === this.category);
    if (category) {
      const iva = 1.19;
      this.price_with_margin = this.net_value * (1 + (category?.margin / 100));
      this.price_with_specific_tax = this.price_with_margin * (1 + (category?.tax / 100));
      this.sell_price = this.price_with_specific_tax * iva;
    } else {
      this.presentAlert("Error", "No se encontro la categoria");
    }
  }

  leftToRightAnimation = (
    element: HTMLElement | NodeListOf<HTMLElement>,
    duration=1000,
    iterations=1
  ): Animation => {
    return this.animationCtrl
      .create()
      .addElement(element)
      .duration(duration)
      .iterations(iterations)
      .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
      .fromTo('opacity', '0.2', '1');
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
