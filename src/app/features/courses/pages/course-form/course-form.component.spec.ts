import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { CalendarModule } from 'primeng/calendar';

import { CourseFormComponent } from './course-form.component';
import { Course } from '../../models/course.model';

describe('CourseFormComponent integrated', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  let router: jasmine.SpyObj<Router>;

  const course: Course = {
    id: 1,
    title: 'Angular course',
    description: 'Angular course description',
    creationDate: new Date('2026-06-09'),
    duration: 120,
    topRated: false,
    authors: [
      {
        id: 1,
        name: 'Test Author',
      },
    ],
  };

  async function setup(routeId: string | null, selectedCourse: Course | null): Promise<void> {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CourseFormComponent],
      imports: [
        ReactiveFormsModule,
        CalendarModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore({
          initialState: {
            auth: {
              userLogin: null,
              token: null,
              isLoading: false,
              error: null,
            },
            courses: {
              courses: [],
              selectedCourse,
              isLoading: false,
              loadMore: true,
              error: null,
            },
          },
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => routeId,
              },
            },
          },
        },
        {
          provide: Router,
          useValue: router,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }

  it('should render all form fields', async () => {
    await setup('1', course);

    expect(fixture.debugElement.query(By.css('input[formControlName="title"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('textarea[formControlName="description"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-duration-input'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('p-calendar[formControlName="creationDate"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-authors-select'))).toBeTruthy();
  });

  it('should set initial values for edit mode', async () => {
    await setup('1', course);

    expect(component.isEditMode).toBeTrue();
    expect(component.courseTitle).toBe(course.title);
    expect(component.courseForm.get('title')?.value).toBe(course.title);
    expect(component.courseForm.get('description')?.value).toBe(course.description);
    expect(component.courseForm.get('duration')?.value).toBe(course.duration);
    expect(component.courseForm.get('topRated')?.value).toBe(course.topRated);
    expect(component.courseForm.get('authors')?.value).toEqual(course.authors);

    const creationDate = component.courseForm.get('creationDate')?.value as Date;

    expect(creationDate.toISOString()).toBe(
      new Date('2026-06-09').toISOString()
    );
  });

  it('should set initial values for create mode', async () => {
    await setup(null, null);

    expect(component.isEditMode).toBeFalse();
    expect(component.courseTitle).toBe('Новый курс');

    expect(component.courseForm.get('title')?.value).toBe('');
    expect(component.courseForm.get('description')?.value).toBe('');
    expect(component.courseForm.get('duration')?.value).toBeNull();
    expect(component.courseForm.get('creationDate')?.value).toBeNull();
    expect(component.courseForm.get('authors')?.value).toEqual([]);
    expect(component.courseForm.get('topRated')?.value).toBeFalse();
  });

  it('should display initial title and description in form fields', async () => {
    await setup('1', course);

    const titleInput = fixture.debugElement.query(
      By.css('input[formControlName="title"]')
    ).nativeElement as HTMLInputElement;

    const descriptionTextarea = fixture.debugElement.query(
      By.css('textarea[formControlName="description"]')
    ).nativeElement as HTMLTextAreaElement;

    expect(titleInput.value).toBe(course.title);
    expect(descriptionTextarea.value).toBe(course.description);
  });

  it('should call onSave when save button is clicked', async () => {
    await setup('1', course);

    spyOn(component, 'onSave');

    const saveButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement as HTMLButtonElement;

    saveButton.click();

    expect(component.onSave).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when cancel button is clicked', async () => {
    await setup('1', course);

    spyOn(component, 'onCancel');

    const cancelButton = fixture.debugElement.query(
      By.css('.course-add__button--cancel')
    );

    cancelButton.triggerEventHandler('click', null);

    expect(component.onCancel).toHaveBeenCalledTimes(1);
  });
});
