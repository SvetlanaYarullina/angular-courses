import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'auth_user';
  private apiUrl = '/users';

  private readonly _userLogin$ = new BehaviorSubject<string | null>(null);
  public readonly userLogin$ = this._userLogin$.asObservable();

  constructor(private http: HttpClient) {}

  public login(login: string, password: string): Observable<boolean> {
    const params = new HttpParams()
      .set('email', login)
      .set('password', password);

    return this.http.get<User[]>(this.apiUrl, { params }).pipe(
      map(users => {
        if (!users.length) {
          this._userLogin$.next(null);
          return false;
        }

        const user = users[0];

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
          login: user.email,
          token: user.fakeToken
        }));

        this._userLogin$.next(user.email);

        return true;
      }),
      catchError(() => {
        this._userLogin$.next(null);
        return of(false);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this._userLogin$.next(null);
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  public getToken(): string | null {
    const data = localStorage.getItem(this.STORAGE_KEY);

    return data ? JSON.parse(data).token : null;
  }

  public getUserInfo(): Observable<User | null> {
    const token = this.getToken();

    if (!token) {
      this._userLogin$.next(null);
      return of(null);
    }

    return this.http.get<User[]>(`${this.apiUrl}?fakeToken=${token}`).pipe(
      map(users => users.length ? users[0] : null),
      tap(user => {
        this._userLogin$.next(user ? user.email : null);
      }),
      catchError(() => {
        this._userLogin$.next(null);
        return of(null);
      })
    );
  }
}
