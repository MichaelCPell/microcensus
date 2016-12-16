import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SessionService } from '../../session.service';
import { User } from '../../user';

const stripe:any = Stripe;

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
  constructor(private http:Http, private session:SessionService, private af: ApplicationRef) { }

  ngOnInit() {
    this.user = this.session.user;
  }


  public experiment(){

    this.submitCard();
  }


  public submitCard(){
    stripe.setPublishableKey('pk_test_egLZwXn91dZAmLYVGBKFDh3T');
      Stripe.card.createToken(this.formCard, (status, response) => {
        this.http.post("https://2ki6gggaqc.execute-api.us-east-1.amazonaws.com/prod/customers",
          {token: response.id, email: "foo@bar.com"})
          .subscribe(
            (next) => {
              console.log(next)
              this.session.user.paid = true;
              console.log(this.session.user.paid)
                this.af.tick();
            },
            (error) => {
              console.log("error")
            }
          )
      });
  }



}
