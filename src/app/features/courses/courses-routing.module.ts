import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: CoursesPageComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'new', 
    component: CourseFormComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: ':id', 
    component: CourseFormComponent,
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
