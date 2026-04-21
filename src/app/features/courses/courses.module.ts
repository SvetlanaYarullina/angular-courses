import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesPageComponent } from './components/courses-page';
import { CourseCardComponent } from './components/course-card';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { HighlightCourseDirective } from '../../shared/directive/highlight-even.directive';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseCardComponent,
    FilterPipe,
    OrderByPipe,
    DurationPipe,
    HighlightCourseDirective,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule 
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }