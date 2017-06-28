import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'reportTypeFilter'
})
export class ReportTypeFilterPipe implements PipeTransform {

  transform(reports: any[], value:any): any {
    if (!reports) return [];
    return Array.from(reports).filter(report => {
      if(report){
        let nameTest = new RegExp(value, "i").test(report.name)
        let descriptionTest = new RegExp(value, "i").test(report.description)
        return (nameTest || descriptionTest)
      }
    });
  }

}
