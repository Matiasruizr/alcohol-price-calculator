import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SucursalesPage } from './sucursales.page';

describe('SucursalesPage', () => {
  let component: SucursalesPage;
  let fixture: ComponentFixture<SucursalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ion-title with value Sucursales', () => {
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title.textContent).toEqual('Sucursales');
  });

  it('should have a button with routerLink to /home', () => {
    const button = fixture.nativeElement.querySelector('ion-button');
    expect(button.getAttribute('routerLink')).toEqual('/home');
  });
});
