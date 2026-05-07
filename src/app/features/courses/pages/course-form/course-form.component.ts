import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  course: Course = {
    id: 0,
    title: '',
    description: '',
    duration: 0,
    creationDate: new Date(),
    topRated: false,
  };

  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.isEditMode = true;
    this.loadingService.show();

    this.coursesService.getItemById(+id)
      .pipe(
        finalize(() => this.loadingService.hide())
      )
      .subscribe({
        next: loadedCourse => {
          this.course = { ...loadedCourse };
        },
        error: () => {
          this.router.navigate(['/courses']);
        }
      });
  }

  public onSave(): void {
    this.loadingService.show();

    if (this.isEditMode) {
      this.coursesService.updateItem(this.course.id, this.course)
        .pipe(
          finalize(() => this.loadingService.hide())
        )
        .subscribe({
          next: () => this.router.navigate(['/courses']),
          error: err => console.error('Ошибка сохранения курса', err),
        });

      return;
    }

    const { id, ...courseToCreate } = this.course;

    this.coursesService.createCourse(courseToCreate)
      .pipe(
        finalize(() => this.loadingService.hide())
      )
      .subscribe({
        next: () => this.router.navigate(['/courses']),
        error: err => console.error('Ошибка сохранения курса', err),
      });
  }

  public onCancel(): void {
    this.router.navigate(['/courses']);
  }

  public onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.course.creationDate = new Date(input.value);
  }
}
