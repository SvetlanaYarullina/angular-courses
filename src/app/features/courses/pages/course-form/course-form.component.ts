import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.coursesService.getItemById(+id).subscribe({
        next: (loadedCourse) => {
          this.course = { ...loadedCourse };
        },
        error: () => {
          this.router.navigate(['/courses']);
        }
      });
    }
  }

  public onSave(): void {
    if (this.isEditMode) {
      this.coursesService.updateItem(this.course.id, this.course).subscribe({
        next: () => this.router.navigate(['/courses']),
        error: err => console.error('Ошибка сохранения курса', err),
      });

      return;
    }

    const { id, ...courseToCreate } = this.course;

    this.coursesService.createCourse(courseToCreate).subscribe({
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
