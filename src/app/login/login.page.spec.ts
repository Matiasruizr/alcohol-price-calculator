import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [SQLite]
    }).compileComponents;
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a ion-title with value Inicio de sesión', () => {
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title.textContent).toEqual('Inicio de sesión');
  });

  it('should have a text input with placeholder "Ingresa tu usuario"', () => {
    const input = fixture.nativeElement.querySelector('#email_input');
    expect(input.getAttribute('placeholder')).toEqual('Ingresa tu usuario');
  });

  it('should have a text input with placeholder "Contraseña"', () => {
    const input = fixture.nativeElement.querySelector('#password_input');
    expect(input.getAttribute('placeholder')).toEqual('Ingresa tu contraseña');
  });

  it('should have a button that calls login method on click', () => {
    const button = fixture.nativeElement.querySelector('#login-button');
    spyOn(component, 'login');
    button.click();
    expect(component.login).toHaveBeenCalled();
  });
});
