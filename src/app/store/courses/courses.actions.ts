import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/features/courses/models/course.model';

export const loadCourses = createAction(
  '[Courses] Load Courses',
  props<{ reset?: boolean }>()
);

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[]; reset: boolean; loadMore: boolean }>()
);

export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: unknown }>()
);

export const searchCourses = createAction(
  '[Courses] Search Courses',
  props<{ search: string }>()
);

export const searchCoursesSuccess = createAction(
  '[Courses] Search Courses Success',
  props<{ courses: Course[] }>()
);

export const searchCoursesFailure = createAction(
  '[Courses] Search Courses Failure',
  props<{ error: unknown }>()
);

export const loadCourse = createAction(
  '[Courses] Load Course',
  props<{ id: number }>()
);

export const loadCourseSuccess = createAction(
  '[Courses] Load Course Success',
  props<{ course: Course }>()
);

export const loadCourseFailure = createAction(
  '[Courses] Load Course Failure',
  props<{ error: unknown }>()
);

export const createCourse = createAction(
  '[Courses] Create Course',
  props<{ course: Omit<Course, 'id'> }>()
);

export const createCourseSuccess = createAction(
  '[Courses] Create Course Success',
  props<{ course: Course }>()
);

export const createCourseFailure = createAction(
  '[Courses] Create Course Failure',
  props<{ error: unknown }>()
);

export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ id: number; course: Partial<Course> }>()
);

export const updateCourseSuccess = createAction(
  '[Courses] Update Course Success',
  props<{ course: Course }>()
);

export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: unknown }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: number }>()
);

export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ id: number }>()
);

export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: unknown }>()
);
