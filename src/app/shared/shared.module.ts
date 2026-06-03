import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DurationPipe } from './pipes/duration.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { HighlightCourseDirective } from './directive/highlight-even.directive';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    DurationPipe,
    FilterPipe,
    OrderByPipe,
    DurationInputComponent,
    HighlightCourseDirective,
    ConfirmDialogComponent,
    PageNotFoundComponent,
    BreadcrumbsComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
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
    BreadcrumbsComponent,
    LoadingComponent,
  ],
})
export class SharedModule { }