import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-radius-selector',
  templateUrl: './radius-selector.component.html',
  styleUrls: ['./radius-selector.component.css']
})
export class RadiusSelectorComponent implements OnInit {
  public activeRadius:number = 1;

  @Input() researchArea:any;

  constructor() { }

  ngOnInit() {
    this.activeRadius = this.researchArea.radius.getValue();
  }

  public setRadius(value){
    this.researchArea.radius = value;
    this.activeRadius = value;
  }

}
