import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
// import NavParams
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  product: any = {};
   // get the product id from the url
  product_id: any;
  name: string = "";
  net_value: number = 0;
  category: string = "";
  categories: any[] = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private AlertController: AlertController,
    private router: Router
  ) { 
    // get the product id from the url
    this.product_id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.product_id)

  }


  ngOnInit() {
    this.api.getProduct(this.product_id).subscribe({
      next: (data: any) => {
        this.name = data.name;
        this.net_value = data.net_value;
        this.category = data.category;
      },
      error: (error: any) => {
        console.error('Error loading categories', error);
        return []
      },
    });

    this.api.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error: any) => {
        console.error('Error loading categories', error);
        return []
      },
    });
  }

  update() {
    this.api.updateProduct({
      product: {
        id: this.product_id,
        name: this.name,
        net_value: this.net_value,
        category: this.category
      }
    }).subscribe({
      next: (data: any) => {
        this.presentAlert("Producto actualizado", "El producto fue actualizado con exito");
      },
      error: (error: any) => {
  
        this.presentAlert("Error", "No se pudo actualizar el producto");
        return []
      },
    });
  }

  delete() {
    this.api.deleteProduct(this.product_id).subscribe({
      next: (data: any) => {
        this.presentAlert("Producto eliminado", "El producto fue eliminado con exito");
        this.router.navigate(['/calculator']);
      },
      error: (error: any) => {
        console.error('Error loading categories', error);
        return []
      },
    });
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
