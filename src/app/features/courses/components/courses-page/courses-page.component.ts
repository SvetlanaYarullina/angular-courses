import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[] = [];
  public searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {
    this.initializeCourses();
  }

   private initializeCourses(): void {
    this.courses = [
    {
      id: 1,
      title: 'Reprehenderit est veniam elit',
      creationDate: new Date('2023-03-18'),
      duration: 232,
      description: 'Consectetur veniam non nulla in laboris minim ipsum. Dolor aliqua irure sint do irure magna tempor culpa quis. Deserunt amet occaecat velit sit.'
    },
    {
      id: 2,
      title: 'Magna Excepteur aute Deserunt',
      creationDate: new Date('2023-03-18'),
      duration: 192,
      description: 'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliquam mollit do fugiat ea dolor mollit irure Lorem tempor.'
    },
    {
      id: 3,
      title: 'Reprehenderit eiusmod nostrud amet',
      creationDate: new Date('2023-03-18'),
      duration: 160,
      description: 'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.'
    },
    {
      id: 4,
      title: 'Sit voluptate eiusmod ea',
      creationDate: new Date('2023-03-18'),
      duration: 120,
      description: 'Commodo id sunt sunt adipisicing et aliquip voluptate laborum consectetur. Occaecat nisi sint exercitation ullamco adipisicing irure est in consectetur aute voluptate. Ea pariatur dolor anim ea reprehenderit ut non occaecat magna adipisicing exercitation nisi consequat.'
    },
    {
      id: 5,
      title: 'Duis mollit reprehenderit ad',
      creationDate: new Date('2023-03-18'),
      duration: 30,
      description: 'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.'
    }
    ];
  }
  
  onEditCourse(course: Course): void {
    console.log('Редактирование курса:', course);
  }
  
  onDeleteCourse(courseId: number): void {
    console.log('Удаление курса:', courseId);
  }

  onSearch(): void {
    console.log('Поиск:', this.searchTerm);
  }

  onLoadMore(): void {
    console.log('Загрузить еще');
  }

  public trackById(index: number, course: Course): number {
    return course.id;
  }
}
