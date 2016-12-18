import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private session:SessionService, private router:Router) { }

  ngOnInit() {
        
  }

  public signOut(){
    this.session.signOut()
    this.router.navigate(["/"]);
  }

  public runExperiment(){
    this.session.user.reload()
  }

}
