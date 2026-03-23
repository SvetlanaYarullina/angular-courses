import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LogoComponent } from './core/logo/logo.component';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseCardComponent } from './features/courses/components/course-card/course-card.component';
import { CourseSearchComponent } from './features/courses/components/course-search/course-search.component';
import { BreadcrumbsComponent } from './features/courses/components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    CoursesComponent,
    CourseCardComponent,
    CourseSearchComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
