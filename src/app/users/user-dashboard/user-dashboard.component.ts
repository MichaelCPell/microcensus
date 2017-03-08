import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from "@angular/router";
import { ResearchAreaService } from "../../shared/research-area.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private router:Router, public user:User, private researchArea: ResearchAreaService) { }

  ngOnInit() {
  }

  public makeReportWithLocation(location){
    this.researchArea.object = location
    this.router.navigate(["/"]);
  }
}
