import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  @Input() imageSource:string;
  @Input() categoryLabel:string;
  @Input() active:boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
