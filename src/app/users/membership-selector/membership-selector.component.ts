import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user';
import { Http } from '@angular/http';

@Component({
  selector: 'app-membership-selector',
  templateUrl: './membership-selector.component.html',
  styleUrls: ['./membership-selector.component.css']
})
export class MembershipSelectorComponent implements OnInit {
  public selectedLevel:string = "";
  private paid:boolean = false;

  constructor(private http:Http) { }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

  get readyToProceed(){
    return 'regular';
    // switch(this.selectedLevel){
    //   case "":
    //   return false;
    //   case 'regular':
    //   return true;
    //   case 'premium':
    //   return this.user["paid"];
    //   case 'unlimited':
    //   return this.user["paid"];
    // }
  }

  get needsToPay(){
    switch(this.selectedLevel){
      case "":
      return false;
      case 'regular':
      return false;
      case 'premium':
        if(this.readyToProceed){
          console.log("Flag One")
          return false;
        }else{
          console.log("Flag Two")
          return true
        }
      case 'unlimited':
        if(this.readyToProceed){
          return false;
        }else{
          return true
        }
    }
  }
}
