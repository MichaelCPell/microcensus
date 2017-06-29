import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReportType } from '../../../models/report-type'
@Component({
  selector: 'app-report-type-selector',
  templateUrl: './report-type-selector.component.html',
  styleUrls: ['./report-type-selector.component.css']
})
export class ReportTypeSelectorComponent implements OnInit {
  @Input() reportSpecification:any;
  @Input() reportTypes:Array<ReportType>;
  @Output() activeReportTypeChange:EventEmitter<any> = new EventEmitter();
  activeCategory:string = "for_everybody"

  categories = [
    {
      imageSource:'https://s3.amazonaws.com/cartoscope-assets/assets/everyone_people.png',
      label: 'Journalists & Scientists',
      slug: 'for_everybody'
    },
    {
      imageSource:'https://s3.amazonaws.com/cartoscope-assets/assets/small_business.png',
      label: 'Business',
      slug: 'business'
    },
    {
      imageSource:'https://s3.amazonaws.com/cartoscope-assets/assets/housing.png',
      label: 'Real Estate',
      slug: 'real_estate'
    },
    {
      imageSource:'https://s3.amazonaws.com/cartoscope-assets/assets/economic_dev.png',
      label: 'Government',
      slug: 'government'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  public setReportType(reportType){
    this.activeReportTypeChange.emit(reportType);
  }

  public setActiveCategory(category){
    console.log(category)
    this.activeCategory = category
  }
}
