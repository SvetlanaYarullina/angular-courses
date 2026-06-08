import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ userLogin: string; token: string | null }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const loadUserInfo = createAction(
  '[Auth] Load User Info'
);

export const loadUserInfoSuccess = createAction(
  '[Auth] Load User Info Success',
  props<{ userLogin: string; token: string | null }>()
);

export const loadUserInfoFailure = createAction(
  '[Auth] Load User Info Failure'
);

export const logout = createAction(
  '[Auth] Logout'
);
