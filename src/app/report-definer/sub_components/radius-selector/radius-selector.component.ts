import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-radius-selector',
  templateUrl: './radius-selector.component.html',
  styleUrls: ['./radius-selector.component.css']
})
export class RadiusSelectorComponent implements OnInit {


  @Input() researchArea:any;

  constructor() { }

  ngOnInit() {
  }

}
