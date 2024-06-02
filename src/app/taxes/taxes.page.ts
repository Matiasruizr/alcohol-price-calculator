import { Component, OnInit } from '@angular/core';
import { categories } from '../../assets/data/categories';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.page.html',
  styleUrls: ['./taxes.page.scss'],
})
export class TaxesPage implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'tax'];
  dataSource = categories;

  constructor() { }

  ngOnInit() {
  }

}
