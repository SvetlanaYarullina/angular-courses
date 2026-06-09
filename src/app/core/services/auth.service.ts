import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'auth_user';
  private apiUrl = '/users';

  constructor(private http: HttpClient) {}

  public login(login: string, password: string): Observable<boolean> {
    const params = new HttpParams()
      .set('email', login)
      .set('password', password);

    return this.http.get<User[]>(this.apiUrl, { params }).pipe(
      map(users => {
        if (!users.length) {
          localStorage.removeItem(this.STORAGE_KEY);
          return false;
        }

        const user = users[0];

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
          login: user.email,
          token: user.fakeToken
        }));

        return true;
      }),
      catchError(() => {
        localStorage.removeItem(this.STORAGE_KEY);
        return of(false);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  public getToken(): string | null {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data).token ?? null;
    } catch {
      localStorage.removeItem(this.STORAGE_KEY);
      return null;
    }
  }

  public getUserInfo(): Observable<User | null> {
    const token = this.getToken();

    if (!token) {
      return of(null);
    }

    const params = new HttpParams().set('fakeToken', token);

    return this.http.get<User[]>(this.apiUrl, { params }).pipe(
      map(users => users.length ? users[0] : null),
      catchError(() => of(null))
    );
  }
}
