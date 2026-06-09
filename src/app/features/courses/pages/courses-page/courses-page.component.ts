import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { State } from 'src/app/store';
import { Course } from 'src/app/features/courses/models/course.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import * as CoursesActions from 'src/app/store/courses/courses.actions';
import {
  selectCourses,
  selectCoursesLoadMore
} from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  public courses$ = this.store.select(selectCourses);
  public loadMore$ = this.store.select(selectCoursesLoadMore);

  public searchTerm = '';

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses({ reset: true }));
    this.initSearch();
  }

  private initSearch(): void {
    this.searchSubject
      .pipe(
        map(search => search.trim()),
        debounceTime(250),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe(search => {
        if (!search) {
          this.store.dispatch(CoursesActions.loadCourses({ reset: true }));
          return;
        }

        if (search.length < 3) {
          return;
        }

        this.store.dispatch(CoursesActions.searchCourses({ search }));
      });
  }

  public onSearchKeyup(search: string): void {
    this.searchSubject.next(search);
  }

  public onLoadMore(): void {
    this.store.dispatch(CoursesActions.loadCourses({ reset: false }));
  }

  public onDeleteCourse(course: Course): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '640px',
      data: { courseTitle: course.title }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(confirmed => {
        if (!confirmed) {
          return;
        }

        this.store.dispatch(CoursesActions.deleteCourse({ id: course.id }));
      });
  }

  public resetFilters(): void {
    this.searchTerm = '';
    this.store.dispatch(CoursesActions.loadCourses({ reset: true }));
  }

  public trackById(index: number, course: Course): number {
    return course.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
