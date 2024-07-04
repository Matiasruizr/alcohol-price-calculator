import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxesPage } from './taxes.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


describe('TaxesPage', () => {
  let component: TaxesPage;
  let fixture: ComponentFixture<TaxesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxesPage],
      imports: [IonicModule.forRoot(), HttpClientModule, MatTableModule],
      providers: [SQLite]
    }).compileComponents;
    fixture = TestBed.createComponent(TaxesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ion-title with value Impuestos', () => {
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title.textContent).toEqual('Impuestos');
  });

  it('should have a button with routerLink to /home', () => {
    const button = fixture.nativeElement.querySelector('ion-button');
    expect(button.getAttribute('routerLink')).toEqual('/home');
  });

  it('should have a table with id taxes-table', () => {
    const table = fixture.nativeElement.querySelector('#taxes-table');
    expect(table).toBeTruthy();
  });
});
