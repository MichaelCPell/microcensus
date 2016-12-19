import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ReportDefinerComponent } from './report-definer/report-definer.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { ResearchAreaService } from './shared/research-area.service';

import { COMPILER_PROVIDERS } from '@angular/compiler';
import { AddressSelectorComponent } from './report-definer/sub_components/address-selector/address-selector.component';
import { MapComponent } from './report-definer/sub_components/map/map.component';
import { SessionDashboardComponent } from './users/session-dashboard/session-dashboard.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';
import { UserDashboardComponent } from './users/user-dashboard/user-dashboard.component';
import { SessionService } from "./users/session.service";
import { MembershipSelectorComponent } from './users/membership-selector/membership-selector.component';
import { SubscriptionCreatorComponent } from './users/payments/subscription-creator/subscription-creator.component';
import { UserConfirmationComponent } from './users/user-confirmation/user-confirmation.component';
import { User } from './users/user';
import { AWSService } from './users/aws.service';

const appRoutes: Routes = [
  { path: '', component: ReportDefinerComponent },
  { path: 'report_viewer/:name', component: ReportViewerComponent },
  { path: 'sign_up', component: UserRegistrationComponent},
  { path: 'dashboard', component: UserDashboardComponent},
  { path: 'membership', component: MembershipSelectorComponent},
  { path: 'users/confirmation', component: UserConfirmationComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ReportDefinerComponent,
    ReportViewerComponent,
    AddressSelectorComponent,
    MapComponent,
    SessionDashboardComponent,
    NavigationComponent,
    UserRegistrationComponent,
    UserDashboardComponent,
    MembershipSelectorComponent,
    SubscriptionCreatorComponent,
    UserConfirmationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    COMPILER_PROVIDERS,
    ResearchAreaService,
    SessionService,
    User,
    AWSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
