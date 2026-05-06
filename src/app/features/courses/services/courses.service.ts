import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly courseUrl = '/videocourses';

  constructor(private readonly http: HttpClient) {}

  public getList(start: number = 0, count: number = 10, search?: string): Observable<Course[]> {
    let url = `${this.courseUrl}?_sort=creationDate&_order=desc`;

    const trimmedSearch = search?.trim();

    if (trimmedSearch) {
      url += `&q=${encodeURIComponent(trimmedSearch)}&_limit=${count}`;
    } else {
      url += `&_start=${start}&_limit=${count}`;
    }

    return this.http.get<Course[]>(url);
  }

  public createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.courseUrl, course);
  }

  public getItemById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.courseUrl}/${id}`);
  }

  public updateItem(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.patch<Course>(`${this.courseUrl}/${id}`, course);
  }

  public removeItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.courseUrl}/${id}`);
  }
}
