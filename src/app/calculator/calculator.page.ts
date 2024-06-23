import {Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'calculator.page.html',
  styleUrls: ['calculator.page.scss'],
})
export class CalculatorPage {
  net_value: number = 0
  category: string = ""
  categories: any[] = [];
  sell_price: number = 0;
  price_with_margin: number = 0;
  price_with_specific_tax: number = 0;
  iva: number = 1.19;
  products: any[] = [];
  name: string = "";

  private titleAnimaton: Animation = {} as Animation;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private AlertController: AlertController,
    private animationCtrl: AnimationController,
    private api: ApiService
  ) {}

  ngAfterViewInit() {
    const element = document.querySelector('#welcome_text') as HTMLElement;
    this.titleAnimaton =  this.leftToRightAnimation(element)
    this.titleAnimaton.play();

    this.api.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error: any) => {
        console.error('Error loading categories', error);
        return []
      },
    });

    this.api.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (error: any) => {
        console.error('Error loading categories', error);
        return []
      },
    });
  }

  clean() {
    this.net_value = 0;
    this.category = "";
  }

  calculatePrice(net_value: number, product_category: string): any {
    const category = this.categories.find((element) => element.name === product_category);
    const price_with_margin = net_value * (1 + (category?.margin / 100));
    const price_with_specific_tax = price_with_margin * (1 + (category?.tax / 100));
    const sell_price = price_with_specific_tax * this.iva;
    if (!category) {
      this.presentAlert("Error", "No se encontro la categoria");
      return false;
    }
    return {
      price_with_margin: price_with_margin,
      price_with_specific_tax: this.price_with_specific_tax,
      sell_price: sell_price,
    }
  }

  calculate() {
    const result = this.calculatePrice(this.net_value, this.category);
    if (result) {

      this.price_with_margin = result.price_with_margin;
      this.price_with_specific_tax = result.price_with_specific_tax;
      this.sell_price = result.sell_price;

      this.api.createProduct({
        product: {
          name: this.name,
          net_value: this.net_value,
          category: this.category,
        }
      }).subscribe({
        next: (data: any) => {
          console.log(data);
          this.presentAlert("Producto creado", "El producto fue creado con exito");
          this.products.push(data);
        },
        error: (error: any) => {
          console.error('Error loading categories', error);
          return []
        },
      });
    } else {
      this.presentAlert("Error", "No se encontro la categoria");
    }
  }

  deleteProduct(productId: number) {
    this.api.deleteProduct(productId).subscribe({
      next: (data: any) => {
        this.presentAlert("Producto eliminado", "El producto fue eliminado con exito");
        this.products = this.products.filter((element) => element.id !== productId);
      },
      error: (error: any) => {
        console.error('Error loading categories', error);
        return []
      },
    });
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

  closeSession() {
    localStorage.setItem('active_session', 'no');
    localStorage.setItem('user', '');
    this.router.navigate(['/login']);
  }

}
