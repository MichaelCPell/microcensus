import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionGatewayComponent } from './session-gateway/session-gateway.component';
import { AuthGuard } from './auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { CognitoSessionStore } from './cognito-session.store';
import { UserLoginComponent } from './session-gateway/subcomponents/user-login/user-login.component';
import { FormsModule } from '@angular/forms';
import { UserLoginService, CognitoUtil } from './cognito.service';

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
    UserLoginComponent
  ],
  exports: [
    SessionGatewayComponent,
    UserLoginComponent
  ],
  providers: [
    UserLoginService,
    CognitoUtil
  ],
  bootstrap:[SessionGatewayComponent]

})
export class CognitoSessionModule { }
export * from './cognito-session.store';