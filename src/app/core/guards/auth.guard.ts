import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, take } from 'rxjs';
import { State } from 'src/app/store';
import * as AuthActions from 'src/app/store/auth/auth.actions';
import { selectAuthState } from 'src/app/store/auth/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    this.store.dispatch(AuthActions.loadUserInfo());

    return this.store.select(selectAuthState).pipe(
      filter(state => !state.isLoading),
      take(1),
      map(state => {
        return state.token
          ? true
          : this.router.createUrlTree(['/login']);
      })
    );
  }
}
