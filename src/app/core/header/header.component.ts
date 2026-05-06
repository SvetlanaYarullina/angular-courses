import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userLogin$ = this.authService.userLogin$;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe();
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
