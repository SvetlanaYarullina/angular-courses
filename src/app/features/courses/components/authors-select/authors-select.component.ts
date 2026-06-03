import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Author } from '../../models/course.model';
import { AuthorsService } from '../../services/authors.service';

@Component({
  selector: 'app-authors-select',
  templateUrl: './authors-select.component.html',
  styleUrls: ['./authors-select.component.scss'],
})
export class AuthorsSelectComponent implements OnInit, OnDestroy {
  @Input() control!: FormControl<Author[]>;

  public authors: Author[] = [];
  public filteredAuthors: Author[] = [];

  private destroy$ = new Subject<void>();

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.authorsService.getAuthors()
      .pipe(takeUntil(this.destroy$))
      .subscribe(authors => {
        this.authors = authors;
      });
  }

  public filterAuthors(event: { query: string }): void {
    const query = event.query.toLowerCase().trim();
    const selectedAuthors = this.control.value || [];

    this.filteredAuthors = this.authors.filter(author => {
      const authorName = this.getAuthorName(author).toLowerCase();
      const isSelected = selectedAuthors.some(selected => selected.id === author.id);

      return !isSelected && authorName.includes(query);
    });
  }

  public onAuthorsChange(): void {
    this.control.markAsTouched();
    this.control.markAsDirty();
    this.control.updateValueAndValidity();

    this.filteredAuthors = [];
  }

  public getAuthorName(author: Author): string {
    return author.lastName
      ? `${author.name} ${author.lastName}`
      : author.name;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
