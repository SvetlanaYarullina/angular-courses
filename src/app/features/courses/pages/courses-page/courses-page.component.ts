import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Course } from 'src/app/features/courses/models/course.model';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { CoursesService } from '../../services/courses.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[] = [];
  public searchTerm: string = '';
  public filteredCourses: Course[] = [];
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private filterPipe: FilterPipe,
    private orderByPipe: OrderByPipe,
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}
  
  ngOnInit(): void {
    this.initializeCourses();
  }

   private initializeCourses(): void {
    this.courses = this.coursesService.getList();

    this.applyFilterAndSort();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyFilterAndSort(): void {
    let result = this.filterPipe.transform(this.courses, this.searchTerm, 'title');
    result = this.orderByPipe.transform(result, 'creationDate');
    
    this.filteredCourses = result;
  }

  public resetFilters(): void {
    this.searchTerm = '';
    this.applyFilterAndSort();
  }
  
  onEditCourse(course: Course): void {
    console.log('Редактирование курса:', course);
  }
  
  onDeleteCourse(course: Course): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '640px',
      data: {
        courseTitle: course.title,
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.coursesService.removeItem(course.id);
          this.initializeCourses();
          this.cdr.detectChanges();
        }
      });
  }

  onSearch(): void {
    this.applyFilterAndSort();
  }

  onLoadMore(): void {
    console.log('Загрузить еще');
  }

  public trackById(index: number, course: Course): number {
    return course.id;
  }
}
