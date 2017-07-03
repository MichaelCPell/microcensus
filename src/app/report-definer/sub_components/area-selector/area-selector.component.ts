import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import {ResearchAreaService} from "../../../shared/research-area.service";
import { User } from "../../../models/user";

@Component({
  selector: 'app-area-selector',
  templateUrl: './area-selector.component.html',
  styleUrls: ['./area-selector.component.css']
})
export class AreaSelectorComponent implements OnInit {
  @Input()  reportSpecification:any;
  @Output() activeAreaChange = new EventEmitter<number>();
  @Output() activeNameChange:EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('nameInput') nameInput;

  constructor() {}

  ngOnInit():void {}

  onPlaceChange(newPlace){
    this.activeAreaChange.emit(newPlace)
  }


  setName(){
    this.activeNameChange.emit(this.nameInput.nativeElement.value)
  }
}
