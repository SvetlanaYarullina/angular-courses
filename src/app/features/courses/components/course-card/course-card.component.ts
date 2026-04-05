import { Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent implements OnChanges, OnInit, OnDestroy, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @Input() course!: Course;
  @Output() edit = new EventEmitter<Course>();
  @Output() delete = new EventEmitter<number>();

  constructor() {
    console.log('constructor');
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngDoCheck() {
    console.log('ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked(');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  public onEdit(): void {
    this.edit.emit(this.course);
  }

  public onDelete(): void {
    this.delete.emit(this.course.id);
  }
}
