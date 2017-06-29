import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
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

  editingName:boolean = false;
  areaInputType:string = "places";

  constructor() {}

  ngOnInit():void {}

  editName(){
    if(this.editingName){
      this.editingName = false;
    }else{
      this.editingName = true;
    }
  }

  onPlaceChange(newPlace){
    newPlace.areaType = "point";
    this.activeAreaChange.emit(newPlace)
  }

  onFileChange(event){
    let file = event.target.files[0]
    let read = new FileReader();
    read.readAsBinaryString(file);

    read.onloadend = () => {
      let json = JSON.parse(read.result);
      json.areaType = "polygon";
      this.activeAreaChange.emit(json)
    }
  }

  onNameInputChange(value){

  }
}
