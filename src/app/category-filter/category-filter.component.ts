import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  @Input() category:any;
  @Input() active:string;
  @Output() select = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }


  selectEvent(){
    this.select.emit(this.category.slug)
  }
}
