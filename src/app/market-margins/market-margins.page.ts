import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-margins',
  templateUrl: './market-margins.page.html',
  styleUrls: ['./market-margins.page.scss'],
})
export class MarketMarginsPage implements OnInit {

  private ELEMENT_DATA = [
    {position: 1, name: 'Whisky', margin: 16},
    {position: 2, name: 'Pisco', margin: 11},
    {position: 3, name: 'Cerveza', margin: 6},
  ];
  displayedColumns: string[] = ['position', 'name', 'margin'];
  dataSource = this.ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
