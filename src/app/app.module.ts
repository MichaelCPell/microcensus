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
import { User } from './models/user';
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { DynamoDBService } from "./services/ddb.service";
import { S3Service } from "./shared/s3.service";
import { ValuesPipe } from './shared/values.pipe';
import { CreditShopComponent } from './users/credit-shop/credit-shop.component';
import { SubscriptionCreatorComponent } from './users/payments/subscription-creator/subscription-creator.component';
import { LocationFilterPipe } from './shared/location-filter.pipe';
import { RadiusSelectorComponent } from './report-definer/sub_components/radius-selector/radius-selector.component';
import { ReportTypeSelectorComponent } from './report-definer/sub_components/report-type-selector/report-type-selector.component';
import { ReportTypeFilterPipe } from './report-definer/sub_components/report-type-selector/report-type-filter.pipe';
import { AreaSelectorComponent } from './report-definer/sub_components/area-selector/area-selector.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { PublisherService } from './report-viewer/publisher.service';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { StoreModule } from '@ngrx/store';
import { reducer } from "./reducers/";
import { LocationListComponent } from './user-dashboard/subcomponents/location-list/location-list.component';
import { CognitoSessionModule, CognitoSessionStore } from './cognito-session/cognito-session.module'
import { UserService } from './services/user.service';
import { AwsService } from './services/aws.service'
import { ReportSpecificationService } from './services/report-specification.service'
import { ReportGeneratorService } from './services/report-generator.service'
import { DynamicComponentFactoryService } from './report-viewer/dynamic_component_factory.service'



export const appRoutes: Routes = [
  { path: '',
    component: ReportDefinerComponent,
    canActivate: []},
  { path: 'report_viewer', component: ReportViewerComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'user', loadChildren: () => CognitoSessionModule},
]


@NgModule({
  declarations: [
    AppComponent,
    ReportDefinerComponent,
    ReportViewerComponent,
    AddressSelectorComponent,
    MapComponent,
    NavigationComponent,
    UserDashboardComponent,
    ValuesPipe,
    CreditShopComponent,
    SubscriptionCreatorComponent,
    LocationFilterPipe,
    RadiusSelectorComponent,
    ReportTypeSelectorComponent,
    ReportTypeFilterPipe,
    AreaSelectorComponent,
    FooterComponent,
    LocationListComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    Ng2PageScrollModule.forRoot(),
    StoreModule.provideStore(reducer),
    CognitoSessionModule
  ],
  providers: [
    COMPILER_PROVIDERS,
    ResearchAreaService,
    DynamoDBService,
    S3Service,
    PublisherService,
    CognitoSessionStore,
    UserService,
    AwsService,
    ReportSpecificationService,
    ReportGeneratorService,
    DynamicComponentFactoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }