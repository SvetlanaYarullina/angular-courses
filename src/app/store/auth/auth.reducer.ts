import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  userLogin: string | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  userLogin: null,
  token: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, AuthActions.loadUserInfo, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, AuthActions.loadUserInfoSuccess, (state, { userLogin, token }) => ({
    ...state,
    userLogin,
    token,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    userLogin: null,
    token: null,
    isLoading: false,
    error,
  })),

  on(AuthActions.loadUserInfoFailure, state => ({
    ...state,
    userLogin: null,
    token: null,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.logout, state => ({
    ...state,
    userLogin: null,
    token: null,
    isLoading: false,
    error: null,
  }))
);
