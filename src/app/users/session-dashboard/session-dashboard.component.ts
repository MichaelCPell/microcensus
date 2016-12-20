import { Component, OnInit } from '@angular/core';
import {SessionService} from '../session.service';

@Component({
  selector: 'app-session-dashboard',
  templateUrl: './session-dashboard.component.html',
  styleUrls: ['./session-dashboard.component.css']
})
export class SessionDashboardComponent implements OnInit {


  constructor(public session:SessionService) { }

  ngOnInit() {
  }

}
