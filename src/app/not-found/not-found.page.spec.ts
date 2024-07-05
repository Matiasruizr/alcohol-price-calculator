import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundPage } from './not-found.page';

describe('NotFoundPage', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ion-title with value Página no encontrada', () => {
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title.textContent).toEqual('Página no encontrada');
  });

  it('should have a button with routerLink to /home', () => {
    const button = fixture.nativeElement.querySelector('ion-button');
    expect(button.getAttribute('routerLink')).toEqual('/home');
  });

  it('should have a button with text Volver a inicio', () => {
    const button = fixture.nativeElement.querySelector('ion-button');
    expect(button.textContent).toEqual('Volver al inicio');
  });

  it('should have a h1 with text La página que buscas no existe', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual('La página que buscas no existe');
  });
});
