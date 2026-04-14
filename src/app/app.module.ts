import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesPageComponent, CourseCardComponent } from './features/courses';
import { HeaderComponent, FooterComponent, LogoComponent } from './core';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from './shared/pipes/duration.pipe';
import { HighlightCourseDirective } from './features/courses/components/directive/highlight-even.directive';
import { OrderByPipe } from './shared/pipes/order-by.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    CoursesPageComponent,
    CourseCardComponent,
    DurationPipe,
    HighlightCourseDirective,
    OrderByPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
   providers: [
    FilterPipe,
    OrderByPipe,
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
