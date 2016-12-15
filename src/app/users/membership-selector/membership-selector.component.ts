import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership-selector',
  templateUrl: './membership-selector.component.html',
  styleUrls: ['./membership-selector.component.css']
})
export class MembershipSelectorComponent implements OnInit {
  public selectedLevel:string = "";
  private paid:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  get readyToProceed(){
    switch(this.selectedLevel){
      case "":
      return false;
      case 'regular':
      return true;
      case 'premium':
      return this.paid;
      case 'unlimited':
      return this.paid;
    }
  }

  get needsToPay(){
    switch(this.selectedLevel){
      case "":
      return false;
      case 'regular':
      return false;
      case 'premium':
      return true;
      case 'unlimited':
      return true;
    }
  }

}
