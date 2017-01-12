import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lfilter'
})
export class LocationFilterPipe implements PipeTransform {

  transform(items: any[], field: string, value:any): any {
    if (!items) return [];
    return items.filter(location => {
      return new RegExp(value, "i").test(location.place.formatted_address)
    });
  }

}
