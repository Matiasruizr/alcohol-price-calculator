import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-market-margins',
  templateUrl: './market-margins.page.html',
  styleUrls: ['./market-margins.page.scss'],
})
export class MarketMarginsPage implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'margin'];
  dataSource = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
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
