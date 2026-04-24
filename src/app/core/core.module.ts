import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { LogoComponent } from './logo';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }