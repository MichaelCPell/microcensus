import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { User } from '../../models/user';
import { Router } from "@angular/router";

@Component({
  selector: 'app-credit-shop',
  templateUrl: './credit-shop.component.html',
  styleUrls: ['./credit-shop.component.css']
})
export class CreditShopComponent implements OnInit {
  public choice:string;
  public loading:boolean = false;

  constructor(private http:Http, private user:User, private router:Router) { }

  ngOnInit() {
  }

  buy(){
    this.loading = true;
    // if(this.user.isCustomer == true){
    //   this.http.post("https://2ki6gggaqc.execute-api.us-east-1.amazonaws.com/dev/payments", {email: this.user.email.getValue()})
    //    .subscribe(
    //      next => {
    //        this.router.navigate(["/"])
    //        this.user.updateFromDdb(JSON.parse(next._body));
    //      }
    //    )
    // }else{
      this.choice = "10";
    // }
  }

}
