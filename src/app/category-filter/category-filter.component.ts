import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  @Input() category:any;
  @Input() active:string;
  @Output() select = new EventEmitter();
  constructor(private angulartics:Angulartics2GoogleAnalytics) { }

  ngOnInit() {
  }


  selectEvent(){
    this.angulartics.eventTrack(this.category.slug, {
      category: 'Report Type Category Selection'
    });
    this.select.emit(this.category.slug);
  }
}
