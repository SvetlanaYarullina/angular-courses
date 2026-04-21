import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public getUserLogin(): string | null {
    return this.authService.getUserLogin();
  }

  public onLogout(): void {
    const userLogin = this.authService.getUserLogin();

    this.authService.logout();
    
    console.log(`Выход ${userLogin}`);
  }
}
