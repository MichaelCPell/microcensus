import { Component, OnInit } from '@angular/core';
import { User } from "./models/user";
import * as AWS from "aws-sdk";
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Store } from '@ngrx/store';
import { UserService } from './services/user.service';
import * as fromRoot from './reducers';
import * as user from './actions/user';
import * as reportTypes from './actions/report-type';
import * as locations from './actions/locations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  constructor(  
                private user:User,
                private angulartics:Angulartics2GoogleAnalytics,
                private store: Store<fromRoot.State>,
                private userService:UserService ) {
  }


  ngOnInit() {
  }

}
