import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.page.html',
  styleUrls: ['./taxes.page.scss'],
})
export class TaxesPage implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'tax'];
  dataSource: any[] = [];
  
  constructor(private http: HttpClient, private api: ApiService) { }

  async ngOnInit() {
    this.api.getCategories().subscribe({
      next: (data: any) => {
        this.dataSource = data;
      },
      error: (error: any) => {
        console.error('Error loading categories', error);
        return []
      },
    });
  }

}
