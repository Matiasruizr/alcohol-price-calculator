import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'taxes',
    loadChildren: () => import('./taxes/taxes.module').then( m => m.TaxesPageModule)
  },
  {
    path: 'market-margins',
    loadChildren: () => import('./market-margins/market-margins.module').then( m => m.MarketMarginsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
