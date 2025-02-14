import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {
  @Output() resetPasswordEvent:EventEmitter<{}> = new EventEmitter();
  @Output() clickEvent = new EventEmitter<string>();
  @Input() email;
  password;
  passwordConfirmation;
  resetCode;

  constructor() { }

  ngOnInit() {
  }

  submit(){
    this.resetPasswordEvent.emit({
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
      resetCode: this.resetCode
    })
  }

}
