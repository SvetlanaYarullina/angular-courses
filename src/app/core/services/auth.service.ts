import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_user';

  public login(login: string, password: string): boolean {
    if (!login || !password) return false;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
      login: login,
      token: 'fake-token'
    }));

    return true;
  }

  public logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  public getUserLogin(): string | null {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (!data) return null;

    return JSON.parse(data).login;
  }
}
