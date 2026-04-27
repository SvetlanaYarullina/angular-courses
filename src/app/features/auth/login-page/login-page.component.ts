import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  login = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const success = this.authService.login(this.login, this.password);
    if (success) {
      console.log('Выполнен вход в систему');
      this.router.navigate(['/courses']);
    }
  }
}
