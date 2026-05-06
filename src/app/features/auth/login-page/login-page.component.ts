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
  public login: string = '';
  public password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public onSubmit(): void {
    this.authService.login(this.login, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/courses']);
      }
    });
  }
}
