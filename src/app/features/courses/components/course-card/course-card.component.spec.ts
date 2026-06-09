import { Course } from 'src/app/features/courses/models/course.model';
import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent isolated', () => {
  let component: CourseCardComponent;

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
    component = new CourseCardComponent();
    component.course = course;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit course when onDelete is called', () => {
    spyOn(component.deleteCourse, 'emit');

    component.onDelete();

    expect(component.deleteCourse.emit).toHaveBeenCalledOnceWith(course);
  });
});
