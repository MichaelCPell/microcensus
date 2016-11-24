import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ReportCreatorComponent } from './report-creator/report-creator.component';
import { ReportDefinerComponent } from './report-definer/report-definer.component';



const appRoutes: Routes = [
  { path: '', component: ReportDefinerComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    ReportDefinerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
