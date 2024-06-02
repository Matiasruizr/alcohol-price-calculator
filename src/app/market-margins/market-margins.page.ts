import { Component, OnInit } from '@angular/core';
import { categories } from '../../assets/data/categories';
@Component({
  selector: 'app-market-margins',
  templateUrl: './market-margins.page.html',
  styleUrls: ['./market-margins.page.scss'],
})
export class MarketMarginsPage implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'margin'];
  dataSource = categories;

  constructor() { }

  ngOnInit() {
  }

}
