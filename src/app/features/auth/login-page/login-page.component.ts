import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';

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
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  public onSubmit(): void {
    this.loadingService.show();

    this.authService.login(this.login, this.password)
      .pipe(
        finalize(() => this.loadingService.hide())
      )
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/courses']);
        }
      });
  }
}
