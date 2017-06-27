import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionGatewayComponent } from './session-gateway/session-gateway.component';
import { AuthGuard } from './auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { CognitoSessionStore } from './cognito-session.store';
import { UserLoginComponent } from './session-gateway/subcomponents/user-login/user-login.component';
import { UserRegistrationComponent } from './session-gateway/subcomponents/user-registration/user-registration.component';
import { UserConfirmationComponent } from './session-gateway/subcomponents/user-confirmation/user-confirmation.component';
import { FormsModule } from '@angular/forms';
import { UserLoginService, CognitoUtil, UserRegistrationService } from './cognito.service';
import { SetNewPasswordComponent } from './session-gateway/subcomponents/set-new-password/set-new-password.component';

const appRoutes: Routes = [
  { path: 'user', component: SessionGatewayComponent },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    SessionGatewayComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    UserConfirmationComponent,
    SetNewPasswordComponent
  ],
  exports: [
    SessionGatewayComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    UserConfirmationComponent
  ],
  providers: [
    UserLoginService,
    UserRegistrationService,
    CognitoUtil
  ],
  bootstrap:[SessionGatewayComponent]
})
export class CognitoSessionModule {
  constructor(private login:UserLoginService){}
 }
export * from './cognito-session.store';