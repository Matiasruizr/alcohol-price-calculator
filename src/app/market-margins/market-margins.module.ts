import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketMarginsPageRoutingModule } from './market-margins-routing.module';

import { MarketMarginsPage } from './market-margins.page';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTableModule,
    MarketMarginsPageRoutingModule
  ],
  declarations: [MarketMarginsPage]
})
export class MarketMarginsPageModule {}
