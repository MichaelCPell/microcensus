import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'reportTypeFilter'
})
export class ReportTypeFilterPipe implements PipeTransform {

  transform(reports: any[], searchQuery:string, category:string): any {
    if (!reports) return [];
    return Array.from(reports).filter(report => {
      if(report){
        let nameTest = new RegExp(searchQuery, "i").test(report.name)
        let descriptionTest = new RegExp(searchQuery, "i").test(report.description)

        let categoryTest = report.category.indexOf(category) != -1
        return (nameTest || descriptionTest) && categoryTest
      }
    });
  }

}
