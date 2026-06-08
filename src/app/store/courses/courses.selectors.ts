import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, coursesFeatureKey } from './courses.reducer';

export const selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectCourses = createSelector(
  selectCoursesState,
  state => state.courses
);

export const selectSelectedCourse = createSelector(
  selectCoursesState,
  state => state.selectedCourse
);

export const selectCoursesLoading = createSelector(
  selectCoursesState,
  state => state.isLoading
);

export const selectCoursesLoadMore = createSelector(
  selectCoursesState,
  state => state.loadMore
);

export const selectCoursesError = createSelector(
  selectCoursesState,
  state => state.error
);

export const selectCoursesCount = createSelector(
  selectCourses,
  courses => courses.length
);
