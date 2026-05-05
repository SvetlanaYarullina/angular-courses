import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesPageComponent } from './pages/courses-page';
import { CourseCardComponent } from './components/course-card';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { AuthorsSelectComponent } from './components/authors-select/authors-select.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseCardComponent,
    CourseFormComponent,
    AuthorsSelectComponent,
  ],
  imports: [
    SharedModule,
    CoursesRoutingModule,
  ],
  providers: [FilterPipe, OrderByPipe],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }