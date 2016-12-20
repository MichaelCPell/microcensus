import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../../user';

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
  constructor(public user:User, private http:Http, private af: ApplicationRef) { }

  ngOnInit() {
  }


  public experiment(){

    this.submitCard();
  }


  public submitCard(){
    Stripe.setPublishableKey('pk_test_egLZwXn91dZAmLYVGBKFDh3T');
      Stripe.card.createToken(this.formCard, (status, response) => {
        this.http.post("https://2ki6gggaqc.execute-api.us-east-1.amazonaws.com/prod/customers",
          {token: response.id, email: this.user.email})
          .subscribe(
            (next) => {
              console.log(next)
              this.user.paid = true;
              console.log(this.user.paid)
                this.af.tick();
            },
            (error) => {
              console.log("error")
            }
          )
      });
  }



}
