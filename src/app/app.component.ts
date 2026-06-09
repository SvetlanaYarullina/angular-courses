import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectIsLoading } from './store';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly isLoading$ = this.store.select(selectIsLoading).pipe(
    delay(0)
  );

  constructor(
    private store: Store<State>,
  ) {}
}
