import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Author, Course } from '../../models/course.model';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
    private fb: FormBuilder,
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
        
        this.courseForm.patchValue({
          title: loadedCourse.title,
          description: loadedCourse.description,
          duration: loadedCourse.duration,
          creationDate: new Date(loadedCourse.creationDate),
          authors: loadedCourse.authors || [],
          topRated: loadedCourse.topRated,
        });
      },
      error: () => this.router.navigate(['/courses'])
    });
    }

  public courseForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    creationDate: [null as Date | null, [Validators.required]],
    duration: [null as number | null, [
      Validators.required,
      Validators.pattern(/^\d+$/)
    ]],
    authors: [[] as Author[], [Validators.required]],
    topRated: [false],
  });

  public hasError(controlName: string, errorName: string): boolean {
    const control = this.courseForm.get(controlName);

    return !!control && control.touched && control.hasError(errorName);
  }

  public onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const formValue = this.courseForm.getRawValue();

    const courseToSave: Omit<Course, 'id'> = {
      title: formValue.title!,
      description: formValue.description!,
      duration: Number(formValue.duration),
      creationDate: formValue.creationDate!,
      topRated: formValue.topRated || false,
      authors: formValue.authors || [],
    };

    this.loadingService.show();

    const request$ = this.isEditMode
      ? this.coursesService.updateItem(this.course.id, courseToSave)
      : this.coursesService.createCourse(courseToSave);

    request$
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

  public get durationControl(): FormControl {
    return this.courseForm.get('duration') as FormControl;
  }

  public get authorsControl(): FormControl {
    return this.courseForm.get('authors') as FormControl;
  }
}
