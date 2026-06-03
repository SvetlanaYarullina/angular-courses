import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/features/courses/models/course.model';
import { CoursesService } from '../../services/courses.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  public courses: Course[] = [];
  public loading = false;
  public loadMore = true;
  public searchTerm = '';

  private currentStart = 0;
  private pageSize = 10;
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.initSearch();
  }

  private initSearch(): void {
    this.searchSubject
      .pipe(
        map(search => search.trim()),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(search => {
          this.currentStart = 0;

          if (!search) {
            this.loading = true;
            this.loadMore = true;
            this.loadingService.show();

            return this.coursesService.getList(0, this.pageSize).pipe(
              catchError(err => {
                console.error('Ошибка загрузки курсов', err);
                return of([]);
              }),
              finalize(() => {
                this.loading = false;
                this.loadingService.hide();
                this.cdr.markForCheck();
              })
            );
          }

          if (search.length < 3) {
            this.loadMore = false;
            return of(null);
          }

          this.loading = true;
          this.loadMore = false;
          this.loadingService.show();

          return this.coursesService.getList(0, 100, search).pipe(
            catchError(err => {
              console.error('Ошибка поиска курсов', err);
              return of([]);
            }),
            finalize(() => {
              this.loading = false;
              this.loadingService.hide();
              this.cdr.markForCheck();
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(courses => {
        if (courses === null) {
          return;
        }

        this.courses = courses;
        this.loadMore = !this.searchTerm.trim() && courses.length === this.pageSize;
      });
  }

  public onSearchKeyup(search: string): void {
    this.searchSubject.next(search);
  }

  public loadCourses(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingService.show();

    this.coursesService.getList(this.currentStart, this.pageSize)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          console.error('Ошибка загрузки курсов', err);
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
          this.loadingService.hide();
          this.cdr.markForCheck();
        })
      )
      .subscribe(courses => {
        if (this.currentStart === 0) {
          this.courses = courses;
        } else {
          this.courses = [...this.courses, ...courses];
        }

        this.loadMore = courses.length === this.pageSize;
      });
  }

  public onLoadMore(): void {
    if (!this.loadMore || this.loading) {
      return;
    }

    this.currentStart += this.pageSize;
    this.loadCourses();
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

        this.loadingService.show();

        this.coursesService.removeItem(course.id)
          .pipe(
            takeUntil(this.destroy$),
            catchError(err => {
              console.error('Ошибка удаления курса', err);
              return of(null);
            }),
            finalize(() => {
              this.loadingService.hide();
              this.cdr.markForCheck();
            })
          )
          .subscribe(() => {
            this.currentStart = 0;
            this.loadCourses();
          });
      });
  }

  public resetFilters(): void {
    this.searchTerm = '';
    this.currentStart = 0;
    this.loadCourses();
  }

  public trackById(index: number, course: Course): number {
    return course.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
