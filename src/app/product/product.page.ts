import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbTaskService } from '../db-task.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  product: any = {};
  product_id: any;
  name: string = "";
  net_value: number = 0;
  category: string = "";
  categories: any[] = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private AlertController: AlertController,
    private router: Router,
    private dbService: DbTaskService,
  ) { 
    // get the product id from the url
    this.product_id = this.activatedRoute.snapshot.paramMap.get('id');
  }


  async ngOnInit() {
    this.api.getProduct(this.product_id).subscribe({
      next: (data: any) => {
        this.name = data.name;
        this.net_value = data.net_value;
        this.category = data.category;
      },
      error: async (error: any) => {
        console.error('Error loading product from API', error);
        const productFromDb = await this.dbService.findProduct(this.product_id);
        this.name = productFromDb?.name;
        this.net_value = productFromDb?.net_value;
        this.category = productFromDb?.category;
      },
    });

    this.api.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: async (error: any) => {
        console.error('Error loading categories from API', error);
        const categoriesFromDb: any[] | undefined = await this.dbService.findCategories();
        if (categoriesFromDb) {
          this.categories = categoriesFromDb;
        }
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
        this.dbService.updateProduct(this.product_id, this.name, this.net_value, this.category);
      },
      error: (error: any) => {
        this.presentAlert("Error", "No se pudo actualizar el producto");
      },
    });
  }

  delete() {
    this.api.deleteProduct(this.product_id).subscribe({
      next: (data: any) => {
        this.presentAlert("Producto eliminado", "El producto fue eliminado con exito");
        this.dbService.deleteProduct(this.product_id);
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
