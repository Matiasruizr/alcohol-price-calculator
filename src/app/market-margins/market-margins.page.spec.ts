import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketMarginsPage } from './market-margins.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


describe('MarketMarginsPage', () => {
  let component: MarketMarginsPage;
  let fixture: ComponentFixture<MarketMarginsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketMarginsPage],
      imports: [IonicModule.forRoot(), HttpClientModule, MatTableModule],
      providers: [SQLite]
    }).compileComponents;

    fixture = TestBed.createComponent(MarketMarginsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ion-title with value Margenes de mercado', () => {
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title.textContent).toEqual('Margenes de mercado');
  });

  it('should have a button with routerLink to /home', () => {
    const button = fixture.nativeElement.querySelector('ion-button');
    expect(button.getAttribute('routerLink')).toEqual('/home');
  });

  it('should have a table with id margins-table', () => {
    const table = fixture.nativeElement.querySelector('#margins-table');
    expect(table).toBeTruthy();
  });
});
