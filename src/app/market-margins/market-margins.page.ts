import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DbTaskService } from '../db-task.service';

@Component({
  selector: 'app-market-margins',
  templateUrl: './market-margins.page.html',
  styleUrls: ['./market-margins.page.scss'],
})
export class MarketMarginsPage implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'margin'];
  dataSource: any[] = [];

  constructor(private api: ApiService, private dbService: DbTaskService) { }

  ngOnInit() {
    this.api.getCategories().subscribe({
      next: (data: any) => {
        this.dataSource = data;
      },
      error: async (error: any) => {
        console.error('Error loading categories from API', error);
        const categoriesFromDb: any[] | undefined = await this.dbService.findCategories();
        if (categoriesFromDb) {
          this.dataSource = categoriesFromDb;
        }
      },
    });
  }

}
