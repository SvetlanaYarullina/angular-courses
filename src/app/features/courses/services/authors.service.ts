import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private readonly authorsUrl = '/authors';

  constructor(private http: HttpClient) {}

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorsUrl);
  }
}
