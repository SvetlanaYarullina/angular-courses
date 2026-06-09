import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(success => {
            if (!success) {
              return AuthActions.loginFailure({
                error: 'Пользователь с таким email и паролем не найден',
              });
            }

            return AuthActions.loginSuccess({
              userLogin: email,
              token: this.authService.getToken(),
            });
          }),
          catchError(() =>
            of(AuthActions.loginFailure({
              error: 'Ошибка входа в систему',
            }))
          )
        )
      )
    )
  );

  public loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/courses']);
        })
      ),
    { dispatch: false }
  );

  public loadUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserInfo),
      switchMap(() =>
        this.authService.getUserInfo().pipe(
          map(user => {
            if (!user) {
              return AuthActions.loadUserInfoFailure();
            }

            return AuthActions.loadUserInfoSuccess({
              userLogin: user.email,
              token: this.authService.getToken(),
            });
          }),
          catchError(() => of(AuthActions.loadUserInfoFailure()))
        )
      )
    )
  );

  public logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
