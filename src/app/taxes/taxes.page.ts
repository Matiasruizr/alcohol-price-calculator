import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { DbTaskService } from '../db-task.service';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.page.html',
  styleUrls: ['./taxes.page.scss'],
})
export class TaxesPage implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'tax'];
  dataSource: any[] = [];
  
  constructor(private http: HttpClient, private api: ApiService, private dbService: DbTaskService) { }

  async ngOnInit() {
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
