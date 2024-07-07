import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraPage } from './camera.page';

describe('CameraPage', () => {
  let component: CameraPage;
  let fixture: ComponentFixture<CameraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button that calls takePhoto method on click', () => {
    const button = fixture.nativeElement.querySelector('#take-photo-button');
    expect(button).toBeTruthy();
    spyOn(component, 'takePhoto');
    button.click();
    expect(component.takePhoto).toHaveBeenCalled();
  });

  it('should have a ion-title with value Camera', () => {
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title.textContent).toEqual('Camera');
  });

  it('should have a button with text Tomar foto', () => {
    const button = fixture.nativeElement.querySelector('#take-photo-button');
    expect(button.textContent).toEqual('Tomar una foto');
  });
});
