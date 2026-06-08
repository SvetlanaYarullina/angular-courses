import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromCourses from './courses/courses.reducer';
import { createSelector } from '@ngrx/store';
import { selectAuthLoading } from './auth/auth.selectors';
import { selectCoursesLoading } from './courses/courses.selectors';

export interface State {
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
  [fromCourses.coursesFeatureKey]: fromCourses.CoursesState;
}

export const reducers: ActionReducerMap<State> = {
  [fromAuth.authFeatureKey]: fromAuth.authReducer,
  [fromCourses.coursesFeatureKey]: fromCourses.coursesReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const selectIsLoading = createSelector(
  selectAuthLoading,
  selectCoursesLoading,
  (authLoading, coursesLoading) => authLoading || coursesLoading
);
