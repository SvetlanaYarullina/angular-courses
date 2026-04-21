import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { OrderByPipe } from './shared/pipes/order-by.pipe';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { registerLocaleData } from '@angular/common';
import { CoursesModule } from './features/courses/courses.module';
import { CoreModule } from './core/core.module';
import localeRu from '@angular/common/locales/ru';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    CoursesModule,
    BrowserAnimationsModule,
  ],
   providers: [
    FilterPipe,
    OrderByPipe,
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
