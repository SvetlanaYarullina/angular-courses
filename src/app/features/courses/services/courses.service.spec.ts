import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CoursesService } from './courses.service';
import { Course } from '../models/course.model';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  const course: Course = {
    id: 1,
    title: 'Test course',
    description: 'Test description',
    creationDate: new Date('2026-06-09'),
    duration: 120,
    topRated: false,
    authors: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses list with pagination', () => {
    const courses: Course[] = [course];

    service.getList(0, 10).subscribe(result => {
      expect(result).toEqual(courses);
    });

    const req = httpMock.expectOne(
      '/videocourses?_sort=creationDate&_order=desc&_start=0&_limit=10'
    );

    expect(req.request.method).toBe('GET');

    req.flush(courses);
  });

  it('should get courses list with search query', () => {
    const courses: Course[] = [course];

    service.getList(0, 10, 'Angular course').subscribe(result => {
      expect(result).toEqual(courses);
    });

    const req = httpMock.expectOne(
      '/videocourses?_sort=creationDate&_order=desc&q=Angular%20course&_limit=10'
    );

    expect(req.request.method).toBe('GET');

    req.flush(courses);
  });

  it('should create course', () => {
    const courseToCreate: Omit<Course, 'id'> = {
      title: 'New course',
      description: 'New description',
      creationDate: new Date('2026-06-09'),
      duration: 90,
      topRated: false,
      authors: [],
    };

    service.createCourse(courseToCreate).subscribe(result => {
      expect(result).toEqual(course);
    });

    const req = httpMock.expectOne('/videocourses');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(courseToCreate);

    req.flush(course);
  });

  it('should get course by id', () => {
    service.getItemById(1).subscribe(result => {
      expect(result).toEqual(course);
    });

    const req = httpMock.expectOne('/videocourses/1');

    expect(req.request.method).toBe('GET');

    req.flush(course);
  });

  it('should update course', () => {
    const courseToUpdate: Partial<Course> = {
      title: 'Updated course',
    };

    const updatedCourse: Course = {
      ...course,
      title: 'Updated course',
    };

    service.updateItem(1, courseToUpdate).subscribe(result => {
      expect(result).toEqual(updatedCourse);
    });

    const req = httpMock.expectOne('/videocourses/1');

    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(courseToUpdate);

    req.flush(updatedCourse);
  });

  it('should remove course', () => {
    service.removeItem(1).subscribe(result => {
      expect(result).toBeNull();
    });

    const req = httpMock.expectOne('/videocourses/1');

    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });
});
