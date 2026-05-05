import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public onLogin(userData: { login: string; password: string }): void {
    const success = this.authService.login(userData.login, userData.password);
    if (success) {
      console.log('Выполнен вход в систему');
    }
  }
}
