import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../user';

@Component({
  selector: 'app-credit-shop',
  templateUrl: './credit-shop.component.html',
  styleUrls: ['./credit-shop.component.css']
})
export class CreditShopComponent implements OnInit {

  constructor(private http:Http, private user:User) { }

  ngOnInit() {
  }

  buy(){
    this.http.post("https://2ki6gggaqc.execute-api.us-east-1.amazonaws.com/dev/payments", {email: this.user.email.getValue()})
      .subscribe(
        next => {
          this.user.updateFromDdb(JSON.parse(next._body));
        }
      )
  }

}
