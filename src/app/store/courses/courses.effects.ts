import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { CoursesService } from 'src/app/features/courses/services/courses.service';
import { State } from '..';
import * as CoursesActions from './courses.actions';
import { selectCoursesCount } from './courses.selectors';

const PAGE_SIZE = 10;
const SEARCH_LIMIT = 100;

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private store: Store<State>,
    private router: Router,
  ) {}

  public loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      withLatestFrom(this.store.select(selectCoursesCount)),
      switchMap(([{ reset = false }, count]) => {
        const start = reset ? 0 : count;

        return this.coursesService.getList(start, PAGE_SIZE).pipe(
          map(courses => CoursesActions.loadCoursesSuccess({
            courses,
            reset,
            loadMore: courses.length === PAGE_SIZE,
          })),
          catchError(error => of(CoursesActions.loadCoursesFailure({ error })))
        );
      })
    )
  );

  public searchCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.searchCourses),
      switchMap(({ search }) =>
        this.coursesService.getList(0, SEARCH_LIMIT, search).pipe(
          map(courses => CoursesActions.searchCoursesSuccess({ courses })),
          catchError(error => of(CoursesActions.searchCoursesFailure({ error })))
        )
      )
    )
  );

  public loadCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadCourse),
      switchMap(({ id }) =>
        this.coursesService.getItemById(id).pipe(
          map(course => CoursesActions.loadCourseSuccess({ course })),
          catchError(error => of(CoursesActions.loadCourseFailure({ error })))
        )
      )
    )
  );

  public createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.createCourse),
      switchMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          map(createdCourse => CoursesActions.createCourseSuccess({ course: createdCourse })),
          catchError(error => of(CoursesActions.createCourseFailure({ error })))
        )
      )
    )
  );

  public updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      switchMap(({ id, course }) =>
        this.coursesService.updateItem(id, course).pipe(
          map(updatedCourse => CoursesActions.updateCourseSuccess({ course: updatedCourse })),
          catchError(error => of(CoursesActions.updateCourseFailure({ error })))
        )
      )
    )
  );

  public deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      switchMap(({ id }) =>
        this.coursesService.removeItem(id).pipe(
          map(() => CoursesActions.deleteCourseSuccess({ id })),
          catchError(error => of(CoursesActions.deleteCourseFailure({ error })))
        )
      )
    )
  );

  public saveCourseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CoursesActions.createCourseSuccess, CoursesActions.updateCourseSuccess),
        tap(() => {
          this.router.navigate(['/courses']);
        })
      ),
    { dispatch: false }
  );

  public loadCourseFailure$ = createEffect(
    () =>
        this.actions$.pipe(
        ofType(CoursesActions.loadCourseFailure),
        tap(() => {
            this.router.navigate(['/courses']);
        })
        ),
    { dispatch: false }
    );
}
