import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import * as AuthActions from 'src/app/store/auth/auth.actions';
import { selectAuthError, selectAuthLoading } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  public readonly isLoading$ = this.store.select(selectAuthLoading);
  public readonly error$ = this.store.select(selectAuthError);

  constructor(
    private store: Store<State>,
  ) {}

  public onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.store.dispatch(AuthActions.login({ email, password }));
  }
}
