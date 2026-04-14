import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Output() edit = new EventEmitter<Course>();
  @Output() delete = new EventEmitter<number>();

  public onEdit(): void {
    this.edit.emit(this.course);
  }

  public onDelete(): void {
    this.delete.emit(this.course.id);
  }
}
