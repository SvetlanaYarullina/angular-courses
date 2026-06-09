import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUserLogin = createSelector(
  selectAuthState,
  state => state.userLogin
);

export const selectAuthToken = createSelector(
  selectAuthState,
  state => state.token
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  state => state.isLoading
);

export const selectAuthError = createSelector(
  selectAuthState,
  state => state.error
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  state => !!state.token
);
