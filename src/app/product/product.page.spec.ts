import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPage } from './product.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ProductPage', () => {
  let component: ProductPage;
  let fixture: ComponentFixture<ProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPage],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
        SQLite
      ],
    }).compileComponents;
    fixture = TestBed.createComponent(ProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ion-title with value Editar producto', () => {
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title.textContent).toEqual('Editar producto');
  });

  it('should have a text input with placeholder "Ingrese nombre del producto"', () => {
    const input = fixture.nativeElement.querySelector('#product_name_input');
    expect(input.getAttribute('placeholder')).toEqual('Ingrese nombre del producto');
  });

  it('should have a text input with placeholder "Ingrese Valor neto"', () => {
    const input = fixture.nativeElement.querySelector('#net_value_input');
    expect(input.getAttribute('placeholder')).toEqual('Ingrese Valor neto');
  });

  it('should have a category select', () => {
    const select = fixture.nativeElement.querySelector('#category_select');
    expect(select).toBeTruthy();
  });

  it('should have a button that calls update method on click', () => {
    const button = fixture.nativeElement.querySelector('#update-button');
    spyOn(component, 'update');
    button.click();
    expect(component.update).toHaveBeenCalled();
  });

  it('should have a button with text Actualizar producto', () => {
    const button = fixture.nativeElement.querySelector('#update-button');
    expect(button.textContent).toEqual('Actualizar producto');
  });

  it('should have a button that calls delete method on click', () => {
    const button = fixture.nativeElement.querySelector('#delete-button');
    spyOn(component, 'delete');
    button.click();
    expect(component.delete).toHaveBeenCalled();
  });

  it('should have a button with text Eliminar producto', () => {
    const button = fixture.nativeElement.querySelector('#delete-button');
    expect(button.textContent).toEqual('Eliminar producto');
  });

  it('should have a button with routerLink to /calculator', () => {
    const button = fixture.nativeElement.querySelector('#back-to-calculator-button');
    expect(button.getAttribute('routerLink')).toEqual('/calculator');
  });
});
