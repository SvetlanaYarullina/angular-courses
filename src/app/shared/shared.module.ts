import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DurationPipe } from './pipes/duration.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { HighlightCourseDirective } from './directive/highlight-even.directive';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    DurationPipe,
    FilterPipe,
    OrderByPipe,
    DurationInputComponent,
    HighlightCourseDirective,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    DurationPipe,
    FilterPipe,
    OrderByPipe,
    DurationInputComponent,
    HighlightCourseDirective,
    ConfirmDialogComponent,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
})
export class SharedModule { }