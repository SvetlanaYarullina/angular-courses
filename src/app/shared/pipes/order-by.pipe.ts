import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform<T>(array: T[], field: keyof T): T[] {
    if (!array || !field) {
      return array;
    }

    return [...array].sort((a, b) => {
      let valueA: any = a[field];
      let valueB: any = b[field];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
      }

      if (typeof valueB === 'string') {
        valueB = valueB.toLowerCase();
      }

      if (valueA instanceof Date && valueB instanceof Date) {
        return valueB.getTime() - valueA.getTime();
      }

      if (valueA < valueB) {
        return -1;
      }

      if (valueA > valueB) {
        return 1;
      }

      return 0;
    });
  }
}