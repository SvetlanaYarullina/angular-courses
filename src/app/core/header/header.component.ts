import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import * as AuthActions from 'src/app/store/auth/auth.actions';
import { selectUserLogin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public readonly userLogin$ = this.store.select(selectUserLogin);

  constructor(
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.loadUserInfo());
  }

  public onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
