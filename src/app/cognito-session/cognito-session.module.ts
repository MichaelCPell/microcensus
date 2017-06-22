import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionGatewayComponent } from './session-gateway/session-gateway.component';
import { AuthGuard } from './auth-guard.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'user', component: SessionGatewayComponent },
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [SessionGatewayComponent],
  exports: [SessionGatewayComponent]
})
export class CognitoSessionModule { }
