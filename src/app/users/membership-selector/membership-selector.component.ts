import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-membership-selector',
  templateUrl: './membership-selector.component.html',
  styleUrls: ['./membership-selector.component.css']
})
export class MembershipSelectorComponent implements OnInit {
  public selectedLevel:string = "";
  private paid:boolean = false;

  constructor(public session:SessionService) { }

  ngOnInit() {
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
          return false;
        }else{
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
