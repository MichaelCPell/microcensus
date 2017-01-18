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
import {DynamoDBService} from "./shared/ddb.service";
import {S3Service} from "./shared/s3.service";
import {AuthGuard} from "./users/auth-guard.service";
import { UserLoginComponent } from './users/user-login/user-login.component';
import { ValuesPipe } from './shared/values.pipe';
import { CreditShopComponent } from './users/credit-shop/credit-shop.component';
import { SubscriptionCreatorComponent } from './users/payments/subscription-creator/subscription-creator.component';
import { LocationFilterPipe } from './shared/location-filter.pipe';
import { RadiusSelectorComponent } from './report-definer/sub_components/radius-selector/radius-selector.component';
import { ReportTypeSelectorComponent } from './report-definer/sub_components/report-type-selector/report-type-selector.component';
import { ReportTypeFilterPipe } from './report-definer/sub_components/report-type-selector/report-type-filter.pipe';




const appRoutes: Routes = [
  { path: '',
    component: ReportDefinerComponent,
    canActivate: [AuthGuard]},
  { path: 'report_viewer/:name', component: ReportViewerComponent },
  { path: 'users/registration', component: UserRegistrationComponent},
  { path: 'users/confirmation', component: UserConfirmationComponent},
  { path: 'users/dashboard', component: UserDashboardComponent},
  { path: 'users/login', component: UserLoginComponent},
  { path: 'credits/new', component: CreditShopComponent}
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
    UserDashboardComponent,
    UserLoginComponent,
    ValuesPipe,
    CreditShopComponent,
    SubscriptionCreatorComponent,
    LocationFilterPipe,
    RadiusSelectorComponent,
    ReportTypeSelectorComponent,
    ReportTypeFilterPipe
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
    UserRegistrationService,
    AuthGuard,
    S3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
