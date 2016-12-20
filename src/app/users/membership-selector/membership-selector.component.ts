import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../session.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-membership-selector',
  templateUrl: './membership-selector.component.html',
  styleUrls: ['./membership-selector.component.css']
})
export class MembershipSelectorComponent implements OnInit {
  public selectedLevel:string = "";
  private paid:boolean = false;

  constructor(public session:SessionService, private http:Http) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log("Destroy was called");
    switch(this.selectedLevel){
      case 'regular':
      break;
    }
  }

  get readyToProceed(){
    switch(this.selectedLevel){
      case "":
      return false;
      case 'regular':
      return true;
      case 'premium':
      return this.session.user.paid;
      case 'unlimited':
      return this.session.user.paid;
    }
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
