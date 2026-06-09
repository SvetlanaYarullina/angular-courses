import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author, Course } from '../../models/course.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { State } from 'src/app/store';
import * as CoursesActions from 'src/app/store/courses/courses.actions';
import { selectSelectedCourse } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit, OnDestroy {
  public isEditMode = false;
  public courseTitle = 'Новый курс';

  private courseId: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.isEditMode = true;
    this.courseId = +id;

    this.store.dispatch(CoursesActions.loadCourse({ id: this.courseId }));

    this.store.select(selectSelectedCourse)
      .pipe(takeUntil(this.destroy$))
      .subscribe(course => {
        if (!course) {
          return;
        }

        this.courseTitle = course.title;

        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          duration: course.duration,
          creationDate: new Date(course.creationDate),
          authors: course.authors || [],
          topRated: course.topRated,
        });
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

    if (this.isEditMode && this.courseId) {
      this.store.dispatch(CoursesActions.updateCourse({
        id: this.courseId,
        course: courseToSave,
      }));

      return;
    }

    this.store.dispatch(CoursesActions.createCourse({
      course: courseToSave,
    }));
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
