import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesPageComponent } from './pages/courses-page';
import { CourseCardComponent } from './components/course-card';
import { CourseAddComponent } from './pages/course-add/course-add.component';
import { AuthorsSelectComponent } from './components/authors-select/authors-select.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';

@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseCardComponent,
    CourseAddComponent,
    AuthorsSelectComponent,
  ],
  imports: [
    SharedModule
  ],
  providers: [FilterPipe, OrderByPipe],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }