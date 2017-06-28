import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as report from '../actions/report.actions'
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router'

@Injectable()
export class ReportGeneratorService{
    constructor(
        private store:Store<fromRoot.State>,
        private http: Http,
        private router:Router){}

    public generate(){
        this.store.select(fromRoot.getReportSpecification).subscribe(
            spec => {
                // TODO: Standardize Report Specification
                let rs = {
                    reportName: spec.reportType.slug,
                    geoJSON: spec.geoJSON
                }

                this.getReportData(rs)
            }
        ).unsubscribe()


        this.store.select(fromRoot.getReport)
        .filter( report => report.data)
        .subscribe( report => {
            console.log("New Report")
            this.router.navigate(["/report_viewer"])
        })
    }

    private getReportData(reportSpecification){
        console.log(reportSpecification)
        this.http.post(environment.backend, reportSpecification)
            .map((res:Response) => res.json())
            // .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
            .subscribe(
                data => {
                    console.log(data)
                    let newReport = {
                        data: data,
                        reportSpecification: reportSpecification
                    }

                    let action = new report.AddAction(newReport)
                    this.store.dispatch(action)
                },
                error =>  {
                    console.log(error["errorMessage"])
                });
    }
}