import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL: string = 'https://control-making-backend-production.up.railway.app';
  response: any;
  constructor(private http: HttpClient) { }

  // return a Observable
  // Im not returnin the data to handle the error direct on the component, and to avoid
  // a limitation on the free plan used to create the API
  getCategories(): Observable<any> {
    return this.http.get(`${this.API_URL}/products/categories`)
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.API_URL}/products`)
  }

  getProduct(productId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/products/${productId}`)
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.API_URL}/products`, product)
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.API_URL}/products/${product.product.id}`, product)
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/products/${productId}`)
  }
}
