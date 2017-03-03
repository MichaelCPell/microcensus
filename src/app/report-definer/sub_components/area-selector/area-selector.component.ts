import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ResearchAreaService} from "../../../shared/research-area.service";
import { User } from "../../../users/user";

@Component({
  selector: 'app-area-selector',
  templateUrl: './area-selector.component.html',
  styleUrls: ['./area-selector.component.css']
})
export class AreaSelectorComponent implements OnInit {
  @Input()  activeArea:any;
  @Output() activeAreaChange = new EventEmitter<number>();

  @Input() activeName:string = "";
  @Output() activeNameChange:EventEmitter<string> = new EventEmitter<string>();

  editingName:boolean = false;
  needsName:boolean = false;
  areaInputType:string = "places";

  constructor(public user:User) {}

  ngOnInit() {
  }

  editName(){
    if(this.editingName){
      this.activeNameChange.emit(this.activeName);
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
    this.needsName = true;

    read.onloadend = () => {
      let json = JSON.parse(read.result);
      json.areaType = "polygon";
      this.activeAreaChange.emit(json)
    }
  }

  onNameInputChange(value){
    this.activeName = value
  }
}
