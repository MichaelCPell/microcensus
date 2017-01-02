import { Component, OnInit } from '@angular/core';
import { User } from '../../users/user'


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public user:User) { }

  ngOnInit() {
  }

  public logOut(){
    this.user.logOut();
  }

}
