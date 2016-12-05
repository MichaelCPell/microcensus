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

const appRoutes: Routes = [
  { path: '', component: ReportDefinerComponent },
  { path: 'report_viewer/:name', component: ReportViewerComponent }

]


@NgModule({
  declarations: [
    AppComponent,
    ReportDefinerComponent,
    ReportViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    COMPILER_PROVIDERS,
    ResearchAreaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
