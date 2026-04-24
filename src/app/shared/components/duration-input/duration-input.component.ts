import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationInputComponent {
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef) {} 

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = +input.value;
    this.value = newValue;
    this.valueChange.emit(newValue);

    this.cdr.detectChanges();
  }
}