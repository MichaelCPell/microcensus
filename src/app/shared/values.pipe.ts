import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.values(value);
  }

}
