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
import { NavigationComponent } from './shared/navigation/navigation.component';
import { User } from './users/user';
import { UserRegistrationComponent } from "./users/user-registration/user-registration.component";
import { UserConfirmationComponent } from "./users/user-confirmation/user-confirmation.component";
import { UserDashboardComponent } from "./users/user-dashboard/user-dashboard.component";
import {AwsUtil} from "./users/aws.service";
import {UserRegistrationService, UserLoginService, UserParametersService, CognitoUtil} from "./users/cognito.service";
import {DynamoDBService} from "./users/ddb.service";

const appRoutes: Routes = [
  { path: '', component: ReportDefinerComponent },
  { path: 'report_viewer/:name', component: ReportViewerComponent },
  { path: 'users/registration', component: UserRegistrationComponent},
  { path: 'users/confirmation', component: UserConfirmationComponent},
  { path: 'users/dashboard', component: UserDashboardComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    ReportDefinerComponent,
    ReportViewerComponent,
    AddressSelectorComponent,
    MapComponent,
    NavigationComponent,
    UserRegistrationComponent,
    UserConfirmationComponent,
    UserDashboardComponent
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
    User,
    AwsUtil,
    CognitoUtil,
    DynamoDBService,
    UserLoginService,
    UserParametersService,
    UserRegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
