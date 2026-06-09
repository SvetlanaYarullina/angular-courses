import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationInputComponent implements OnInit {
  @Input() control!: FormControl<number | null>;

  public value$!: Observable<number | null>;

  ngOnInit(): void {
    this.value$ = this.control.valueChanges.pipe(
      startWith(this.control.value)
    );
  }
}
