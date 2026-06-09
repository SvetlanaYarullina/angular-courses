import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AuthorsSelectComponent } from './authors-select.component';
import { Author } from '../../models/course.model';

describe('AuthorsSelectComponent', () => {
  let component: AuthorsSelectComponent;
  let fixture: ComponentFixture<AuthorsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorsSelectComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        AutoCompleteModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorsSelectComponent);
    component = fixture.componentInstance;

    component.control = new FormControl<Author[]>([], {
      nonNullable: true,
    });

fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
