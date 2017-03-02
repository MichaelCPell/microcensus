import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ResearchAreaService} from "../../../shared/research-area.service";
import { User } from "../../../users/user";

@Component({
  selector: 'app-area-selector',
  templateUrl: './area-selector.component.html',
  styleUrls: ['./area-selector.component.css']
})
export class AreaSelectorComponent implements OnInit {
  @Input()  area:any;
  @Output() activeAreaChange = new EventEmitter<number>();
  
  @Input() name:string = "";
  editingName:boolean = false;
  needsName:boolean = false;
  place:any;
  areaType:string = "point";
  readyToAnalyze:boolean = false;

  constructor(private researchArea: ResearchAreaService, public user:User,) {
    this.researchArea = researchArea;
  }

  ngOnInit() {
      if(this.researchArea.researchArea.name){
        console.log(this.researchArea.researchArea)
        this.readyToAnalyze = true;
        this.areaType = this.researchArea.researchArea.type;
      }
  }

  editName(){
    if(this.editingName){
      this.researchArea.researchArea.name = this.name
      this.editingName= false;
    }else{
      this.editingName = true;
    }
  }

  onPlaceChange(newPlace){
    this.areaType = "point";
    this.place = newPlace
    this.researchArea.place = this.place;
    this.readyToAnalyze = true;
  }

  onFileChange(event){
    this.areaType = "polygon";
    let file = event.target.files[0]
    let read = new FileReader();
    read.readAsBinaryString(file);
    this.needsName = true;

    read.onloadend = () => {
      console.log(read.result);
      let json = JSON.parse(read.result);
      this.researchArea.shape = json
      this.readyToAnalyze = true;
    }
  }

  onNameChange(value){
    this.name = value
  }
}
