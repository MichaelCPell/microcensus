import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-report-type-selector',
  templateUrl: './report-type-selector.component.html',
  styleUrls: ['./report-type-selector.component.css']
})
export class ReportTypeSelectorComponent implements OnInit {
  @Input() activeReportType:any;
  @Input() reportTypes:Array<any>;
  @Output() activeReportTypeChange:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public setReportType(reportType){
    this.activeReportTypeChange.emit(reportType);
  }
}
