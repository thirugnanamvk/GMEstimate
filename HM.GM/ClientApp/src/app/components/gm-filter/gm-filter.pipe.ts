import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gmFilter'
})
export class GmFilterPipe implements PipeTransform {

  transform(items: any[], value: string, label: string): any[] {
    if (!items) return [];
    if (!value) return items;
    if (value == '' || value == null) return [];
    return items.filter(e => e[label].toLowerCase().indexOf(value.toLowerCase()) > -1);

  }

}
