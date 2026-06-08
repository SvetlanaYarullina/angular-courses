import { createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/features/courses/models/course.model';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: Course[];
  selectedCourse: Course | null;
  isLoading: boolean;
  loadMore: boolean;
  error: unknown | null;
}

export const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  isLoading: false,
  loadMore: true,
  error: null,
};

export const coursesReducer = createReducer(
  initialState,

  on(
    CoursesActions.loadCourses,
    CoursesActions.searchCourses,
    CoursesActions.createCourse,
    CoursesActions.updateCourse,
    CoursesActions.deleteCourse,
    state => ({
        ...state,
        isLoading: true,
        error: null,
    })
  ),

  on(CoursesActions.loadCoursesSuccess, (state, { courses, reset, loadMore }) => ({
    ...state,
    courses: reset ? courses : [...state.courses, ...courses],
    loadMore,
    isLoading: false,
    error: null,
  })),

  on(CoursesActions.searchCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loadMore: false,
    isLoading: false,
    error: null,
  })),

  on(CoursesActions.loadCourseSuccess, (state, { course }) => ({
    ...state,
    selectedCourse: course,
    isLoading: false,
    error: null,
  })),

  on(CoursesActions.createCourseSuccess, state => ({
    ...state,
    isLoading: false,
    error: null,
  })),

  on(CoursesActions.updateCourseSuccess, (state, { course }) => ({
    ...state,
    selectedCourse: course,
    courses: state.courses.map(item => item.id === course.id ? course : item),
    isLoading: false,
    error: null,
  })),

  on(CoursesActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter(course => course.id !== id),
    isLoading: false,
    error: null,
  })),

  on(
    CoursesActions.loadCoursesFailure,
    CoursesActions.searchCoursesFailure,
    CoursesActions.loadCourseFailure,
    CoursesActions.createCourseFailure,
    CoursesActions.updateCourseFailure,
    CoursesActions.deleteCourseFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })
  )
);
