import { Pipe, PipeTransform } from '@angular/core';
import { Report } from '../models/report'

@Pipe({
  name: 'toLabel'
})
export class ToLabelPipe implements PipeTransform {

  transform(report: Report): string {
    if(report.reportSpecification.geoJSON.geometry.type == "Point"){
      return `${report.reportSpecification.reportType.name} -- ${report.reportSpecification.geoJSON.geometry.radius/1600} Mile Radius`
    }else{
      return `${report.reportSpecification.reportType.name}`
    }
  }

}
