import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CalculatorPage } from './calculator.page';
import {MatCardModule} from '@angular/material/card';

import { CalculatorPageRoutingModule } from './calculator-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculatorPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
  ],
  providers: [provideNativeDateAdapter()],
  declarations: [CalculatorPage]
})
export class CalculatorPageModule {}
