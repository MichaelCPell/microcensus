import { Component, OnInit, ApplicationRef, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../../user';
import { Router } from '@angular/router';

declare var Stripe: any;

@Component({
  selector: 'app-subscription-creator',
  templateUrl: './subscription-creator.component.html',
  styleUrls: ['./subscription-creator.component.css']
})
export class SubscriptionCreatorComponent implements OnInit {
  public formCard:Object ={
    number: "4242424242424242",
    cvc: "123",
    expMonth: "12",
    expYear: "20"
  };
  @Input() choice:string;
  constructor(public user:User, private http:Http, private af: ApplicationRef, private router:Router) { }

  ngOnInit() {
  }

  public submitCard(){
    Stripe.setPublishableKey('pk_test_egLZwXn91dZAmLYVGBKFDh3T');
      Stripe.card.createToken(this.formCard, ((status, response) => {
        this.http.post("https://2ki6gggaqc.execute-api.us-east-1.amazonaws.com/dev/payments", {email: this.user.email.getValue(), token: response.id})
         .subscribe(
           next => {
             this.user.updateFromDdb(JSON.parse(next._body));
             this.router.navigate(["users/dashboard"])
           }
         )
      }).bind(this))
  }
}
