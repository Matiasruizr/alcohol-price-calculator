import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ion-title with value Inicio', () => {
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title.textContent).toEqual('Inicio');
  });

  it('should have a link with text Margenes de mercado', () => {
    const link = fixture.nativeElement.querySelector('#market-margins-link');
    expect(link.textContent).toEqual('Margenes de mercado por categorías');
  });

  it('should have a link with text Impuestos por categorías', () => {
    const link = fixture.nativeElement.querySelector('#taxes-link');
    expect(link.textContent).toEqual('Impuestos por categorías');
  });

  it('should have a link with text Sucursales', () => {
    const link = fixture.nativeElement.querySelector('#branches-link');
    expect(link.textContent).toEqual('Sucursales');
  });

  it('should have a link with text Calculadora de precio de venta', () => {
    const link = fixture.nativeElement.querySelector('#calculator-link');
    expect(link.textContent).toEqual('Calculadora de precio de venta (require inicio de sesión)');
  });

  it('should have a link with text Iniciar sesión', () => {
    const link = fixture.nativeElement.querySelector('#login-link');
    expect(link.textContent).toEqual('Inicio de sesión');
  });

  it('should have a link with text Camara', () => {
    const link = fixture.nativeElement.querySelector('#camera-link');
    expect(link.textContent).toEqual('Cámara');
  });

  it('should have company logo', () => {
    const logo = fixture.nativeElement.querySelector('#logo_home');
    expect(logo.getAttribute('src')).toEqual('assets/img/logo.png');
  });
});
