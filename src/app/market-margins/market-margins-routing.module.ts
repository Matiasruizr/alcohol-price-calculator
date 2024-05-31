import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketMarginsPage } from './market-margins.page';

const routes: Routes = [
  {
    path: '',
    component: MarketMarginsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketMarginsPageRoutingModule {}
