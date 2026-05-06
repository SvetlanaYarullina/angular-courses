import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'auth_user';
  private apiUrl = '/users';

  constructor(private http: HttpClient) {}

  public login(login: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${login}&password=${password}`).pipe(
      map(users => {
        if (users.length) {
          const user = users[0];
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
            login: user.email,
            token: user.fakeToken
          }));

          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  public logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  public getUserLogin(): string | null {
    const data = localStorage.getItem(this.STORAGE_KEY);

    return data ? JSON.parse(data).login : null;
  }

  public getToken(): string | null {
    const data = localStorage.getItem(this.STORAGE_KEY);

    return data ? JSON.parse(data).token : null;
  }

  public getUserInfo(): Observable<User | null> {
    const token = this.getToken();

    if (!token) {
      return of(null);
    }

    return this.http.get<User[]>(`${this.apiUrl}?fakeToken=${token}`).pipe(
      map(users => users.length ? users[0] : null),
      catchError(() => of(null))
    );
  }
}
