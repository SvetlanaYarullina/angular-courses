import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[] = [];
  public searchTerm: string = '';
  public filteredCourses: Course[] = [];

  constructor(
    private filterPipe: FilterPipe,
    private orderByPipe: OrderByPipe,
  ) {}
  
  ngOnInit(): void {
    this.initializeCourses();
  }

   private initializeCourses(): void {
    this.courses = [
    {
      id: 1,
      title: 'Reprehenderit est veniam elit',
      creationDate: new Date('2026-04-01'),
      duration: 232,
      description: 'Consectetur veniam non nulla in laboris minim ipsum. Dolor aliqua irure sint do irure magna tempor culpa quis. Deserunt amet occaecat velit sit.',
      topRated: false,
    },
    {
      id: 2,
      title: 'Magna Excepteur aute Deserunt',
      creationDate: new Date('2026-04-10'),
      duration: 192,
      description: 'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliquam mollit do fugiat ea dolor mollit irure Lorem tempor.',
      topRated: true,
    },
    {
      id: 3,
      title: 'Reprehenderit eiusmod nostrud amet',
      creationDate: new Date('2026-03-20'),
      duration: 160,
      description: 'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
      topRated: true,
    },
    {
      id: 4,
      title: 'Sit voluptate eiusmod ea',
      creationDate: new Date('2026-04-20'),
      duration: 120,
      description: 'Commodo id sunt sunt adipisicing et aliquip voluptate laborum consectetur. Occaecat nisi sint exercitation ullamco adipisicing irure est in consectetur aute voluptate. Ea pariatur dolor anim ea reprehenderit ut non occaecat magna adipisicing exercitation nisi consequat.',
      topRated: true,
    },
    {
      id: 5,
      title: 'Duis mollit reprehenderit ad',
      creationDate: new Date('2026-03-28'),
      duration: 30,
      description: 'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
      topRated: false,
    }
    ];

    this.applyFilterAndSort();
  }

  private applyFilterAndSort(): void {
    let result = this.filterPipe.transform(this.courses, this.searchTerm, 'title');
    result = this.orderByPipe.transform(result, 'creationDate');
    
    this.filteredCourses = result;
  }

  public resetFilters(): void {
    this.searchTerm = '';
    this.applyFilterAndSort();
  }
  
  onEditCourse(course: Course): void {
    console.log('Редактирование курса:', course);
  }
  
  onDeleteCourse(courseId: number): void {
    console.log('Удаление курса:', courseId);
  }

  onSearch(): void {
    this.applyFilterAndSort();
  }

  onLoadMore(): void {
    console.log('Загрузить еще');
  }

  public trackById(index: number, course: Course): number {
    return course.id;
  }
}
