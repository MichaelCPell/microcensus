import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-radius-selector',
  templateUrl: './radius-selector.component.html',
  styleUrls: ['./radius-selector.component.css']
})
export class RadiusSelectorComponent implements OnInit {
  @Input()  activeRadius:number;
  @Output() activeRadiusChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public setRadius(value){
    console.log(0)
    this.activeRadius = value;
    this.activeRadiusChange.emit(value);
  }


}
