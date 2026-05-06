import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/features/courses/models/course.model';
import { CoursesService } from '../../services/courses.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { finalize, Subject, takeUntil } from 'rxjs';

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

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  public loadCourses(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;

    const search = this.searchTerm.trim();
    const limit = search ? 100 : this.pageSize;

    this.coursesService.getList(this.currentStart, limit, search)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: courses => {
          if (this.currentStart === 0) {
            this.courses = courses;
          } else {
            this.courses = [...this.courses, ...courses];
          }

          this.loadMore = !search && courses.length === this.pageSize;
        },
        error: err => {
          console.error('Ошибка загрузки курсов', err);
        }
      });
  }
  
  public onSearch() {
    this.currentStart = 0;
    this.loadCourses(); 
  }

  public onLoadMore() {
    if (!this.loadMore || this.loading) return;

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
        if (confirmed) {
          this.coursesService.removeItem(course.id).subscribe(() => {
            this.currentStart = 0;
            this.loadCourses();
          });
        }
      });
  }

  public resetFilters(): void {
    this.searchTerm = '';
    this.currentStart = 0;
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackById(index: number, course: Course): number {
    return course.id;
  }
}
