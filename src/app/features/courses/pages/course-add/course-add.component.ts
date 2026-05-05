import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseAddComponent {
  course: Omit<Course, 'id'> = {
    title: '',
    description: '',
    duration: 0,
    creationDate: new Date(),
    topRated: false,
  };

  onSave(): void {
    console.log('Сохранение курса');
  }

  onCancel(): void {
    console.log('Отмена');
  }

  public onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.course.creationDate = new Date(input.value);
  }
}