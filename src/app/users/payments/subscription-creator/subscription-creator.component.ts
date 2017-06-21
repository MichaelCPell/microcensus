import { Component, OnInit, ApplicationRef, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../../user';
import { Router } from '@angular/router';
import {environment} from 'environments/environment';

declare var Stripe: any;

@Component({
  selector: 'app-subscription-creator',
  templateUrl: './subscription-creator.component.html',
  styleUrls: ['./subscription-creator.component.css']
})
export class SubscriptionCreatorComponent implements OnInit {
  public formCard:Object = environment.formCard;
  public loading:boolean = false;

  @Input() choice:string;
  constructor(public user:User, private http:Http, private af: ApplicationRef, private router:Router) { }

  ngOnInit() {

  }

  // public submitCard(){
  //   this.loading = true;

  //   Stripe.setPublishableKey(environment.stripe_publishable);
  //     Stripe.card.createToken(this.formCard, ((status, response) => {
  //       this.http.post(`${environment.backend}/payments`, {email: this.user.email, token: response.id})
  //        .subscribe(
  //          next => {
  //            this.user.updateFromDdb(JSON.parse(next["_body"]));
  //            this.router.navigate(["/"])
  //          }
  //        )
  //     }).bind(this))
  // }
}
