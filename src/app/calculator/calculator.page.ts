import {Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'calculator.page.html',
  styleUrls: ['calculator.page.scss'],
})
export class CalculatorPage {
  user: string = ""
  valor_neto: number = 0
  category: string = ""

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
    const element = document.querySelector('#welcome_text') as HTMLElement;
    this.titleAnimaton =  this.leftToRightAnimation(element)
    this.titleAnimaton.play();
  }


  clean() {
    this.valor_neto = 0;
    this.category = "";
  }

  calculate() {
    console.log("calculating")
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
