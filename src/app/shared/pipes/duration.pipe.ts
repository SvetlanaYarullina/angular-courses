import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} минут`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} час${hours > 1 ? 'а' : ''}`;
    }
    
    return `${hours} час${hours > 1 ? 'а' : ''} ${remainingMinutes} минут`;
  }
}