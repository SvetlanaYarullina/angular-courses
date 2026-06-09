import { ElementRef, Renderer2 } from '@angular/core';
import { HighlightCourseDirective } from './highlight-even.directive';

describe('HighlightCourseDirective', () => {
  let directive: HighlightCourseDirective;
  let element: ElementRef;
  let renderer: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    element = {
      nativeElement: {},
    } as ElementRef;

    renderer = jasmine.createSpyObj<Renderer2>('Renderer2', ['setStyle']);

    directive = new HighlightCourseDirective(element, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set green border if course date is within last 14 days', () => {
    directive.currentDate = new Date('2026-06-20');
    directive.creationDate = new Date('2026-06-10');

    directive.ngAfterViewInit();

    expect(renderer.setStyle).toHaveBeenCalledOnceWith(
      element.nativeElement,
      'border',
      '2px solid green'
    );
  });

  it('should set blue border if course date is in future', () => {
    directive.currentDate = new Date('2026-06-10');
    directive.creationDate = new Date('2026-06-15');

    directive.ngAfterViewInit();

    expect(renderer.setStyle).toHaveBeenCalledOnceWith(
      element.nativeElement,
      'border',
      '2px solid blue'
    );
  });

  it('should not set border if course date is older than 14 days', () => {
    directive.currentDate = new Date('2026-06-20');
    directive.creationDate = new Date('2026-06-01');

    directive.ngAfterViewInit();

    expect(renderer.setStyle).not.toHaveBeenCalled();
  });

  it('should not set border if creationDate is empty', () => {
    directive.creationDate = null;

    directive.ngAfterViewInit();

    expect(renderer.setStyle).not.toHaveBeenCalled();
  });
});
