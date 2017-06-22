import { Component, OnInit } from '@angular/core';
import { CognitoSessionStore } from '../cognito-session.store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-session-gateway',
  templateUrl: './session-gateway.component.html',
  styleUrls: ['./session-gateway.component.css']
})
export class SessionGatewayComponent implements OnInit {
  
  constructor(private store:CognitoSessionStore) { 
    var source = Observable.fromEvent(document,'mousedown')

    source.subscribe(
      (x) => {
        this.store.set("user", "bar")
      }
    )

    this.store.select("user").subscribe(
      (x) => {
        console.log(x)
      }
    )
  }

  ngOnInit() {

  }

}
