import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketMarginsPage } from './market-margins.page';

describe('MarketMarginsPage', () => {
  let component: MarketMarginsPage;
  let fixture: ComponentFixture<MarketMarginsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketMarginsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
