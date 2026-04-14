import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, field: string): any[] {
      if (!items || !searchText || !field) {
        return items;
      }
      
      searchText = searchText.toLowerCase().trim();
      
      return items.filter(item => 
        item[field]?.toString().toLowerCase().includes(searchText)
      );
  }
}
