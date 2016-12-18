import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private session:SessionService) { }

  ngOnInit() {
  }

  public signOut(){
    this.session.signOut()
  }

  public runExperiment(){
    this.session.user.reload()
  }

}
