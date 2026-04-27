import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { 
    path: 'courses',
    loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
