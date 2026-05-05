import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightCourse]'
})
export class HighlightCourseDirective implements AfterViewInit {
  @Input('appHighlightCourse') creationDate: Date | string | null = null;
  @Input() currentDate: Date = new Date();

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
  ) { }

  public ngAfterViewInit(): void {
    if (!this.creationDate) {
      return;
    }
    
    const courseDate = new Date(this.creationDate);
    const now = new Date(this.currentDate);
    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(now.getDate() - 14);

    if (courseDate < now && courseDate >= twoWeeksAgo) {
      this.renderer.setStyle(this.element.nativeElement, 'border', '2px solid green');
    }
    
    if (courseDate > now) {
      this.renderer.setStyle(this.element.nativeElement, 'border', '2px solid blue');
    }
  }
}