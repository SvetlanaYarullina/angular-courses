import { Action } from '@ngrx/store';
import { Course } from 'src/app/features/courses/models/course.model';
import * as CoursesActions from './courses.actions';
import {
  coursesReducer,
  initialState,
  CoursesState,
} from './courses.reducer';

describe('CoursesReducer', () => {
  const course: Course = {
    id: 1,
    title: 'Test course',
    description: 'Test description',
    creationDate: new Date('2024-01-10'),
    duration: 120,
    topRated: false,
    authors: [],
  };

  it('should return initial state for unknown action', () => {
    const action = { type: 'Unknown' } as Action;

    const state = coursesReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should set isLoading true on loadCourses', () => {
    const action = CoursesActions.loadCourses({ reset: true });

    const state = coursesReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('should clear selectedCourse and set isLoading true on loadCourse', () => {
    const previousState: CoursesState = {
      ...initialState,
      selectedCourse: course,
    };

    const action = CoursesActions.loadCourse({ id: 1 });

    const state = coursesReducer(previousState, action);

    expect(state).toEqual({
      ...previousState,
      selectedCourse: null,
      isLoading: true,
      error: null,
    });
  });

  it('should set courses on loadCoursesSuccess with reset', () => {
    const courses = [course];

    const action = CoursesActions.loadCoursesSuccess({
      courses,
      reset: true,
      loadMore: false,
    });

    const state = coursesReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      courses,
      loadMore: false,
      isLoading: false,
      error: null,
    });
  });

  it('should append courses on loadCoursesSuccess without reset', () => {
    const previousCourse: Course = {
      ...course,
      id: 2,
      title: 'Previous course',
    };

    const previousState: CoursesState = {
      ...initialState,
      courses: [previousCourse],
    };

    const action = CoursesActions.loadCoursesSuccess({
      courses: [course],
      reset: false,
      loadMore: true,
    });

    const state = coursesReducer(previousState, action);

    expect(state.courses).toEqual([previousCourse, course]);
    expect(state.loadMore).toBeTrue();
    expect(state.isLoading).toBeFalse();
  });

  it('should set selectedCourse on loadCourseSuccess', () => {
    const action = CoursesActions.loadCourseSuccess({ course });

    const state = coursesReducer(initialState, action);

    expect(state.selectedCourse).toEqual(course);
    expect(state.isLoading).toBeFalse();
  });

  it('should add course on createCourseSuccess', () => {
    const action = CoursesActions.createCourseSuccess({ course });

    const state = coursesReducer(initialState, action);

    expect(state.courses).toEqual([course]);
    expect(state.isLoading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should update course on updateCourseSuccess', () => {
    const previousState: CoursesState = {
      ...initialState,
      courses: [course],
    };

    const updatedCourse: Course = {
      ...course,
      title: 'Updated course',
    };

    const action = CoursesActions.updateCourseSuccess({
      course: updatedCourse,
    });

    const state = coursesReducer(previousState, action);

    expect(state.courses[0].title).toBe('Updated course');
    expect(state.selectedCourse).toEqual(updatedCourse);
    expect(state.isLoading).toBeFalse();
  });

  it('should remove course on deleteCourseSuccess', () => {
    const previousState: CoursesState = {
      ...initialState,
      courses: [course],
    };

    const action = CoursesActions.deleteCourseSuccess({ id: 1 });

    const state = coursesReducer(previousState, action);

    expect(state.courses).toEqual([]);
    expect(state.isLoading).toBeFalse();
  });
});
