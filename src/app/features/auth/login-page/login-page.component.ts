import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public login: string = '';
  public password: string = '';

  @Output() loginSubmit = new EventEmitter<{ login: string; password: string }>();

  public onSubmit(): void {
    this.loginSubmit.emit({ login: this.login, password: this.password });
  }
}