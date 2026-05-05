import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './features/courses/courses.module';
import { AuthModule } from './features/auth/auth.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    CoursesModule,
    AuthModule,
    SharedModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }