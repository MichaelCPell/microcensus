import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-type-selector',
  templateUrl: './report-type-selector.component.html',
  styleUrls: ['./report-type-selector.component.css']
})
export class ReportTypeSelectorComponent implements OnInit {

  public reports = [
    {
      name: "General Demographic Report",
      description: "Man bun stumptown mumblecore, shabby chic vexillologist artisan lo-fi yr migas keytar 3 wolf moon. Kinfolk craft beer helvetica occupy vaporware, you probably haven't heard of them lo-fi succulents polaroid blue bottle copper mug church-key wolf thundercats literally. Farm-to-table chambray ramps squid.",
      slug: "general_demographic_report"
    },
    {
      name: "Longitudinal Population Report",
      description: "Affogato raclette banh mi crucifix godard occupy. Twee lo-fi chia flannel tofu poke. Before they sold out semiotics deep v mlkshk meditation ugh, la croix blue bottle readymade kickstarter sriracha. Post-ironic mlkshk normcore cred shabby chic echo park, lo-fi VHS neutra gastropub coloring book.",
      slug: "general_demographic_report"
    },
    {
      name: "Age and Education Report",
      description: "Chambray squid listicle, kale chips coloring book church-key woke +1 hexagon venmo. Before they sold out man bun farm-to-table cardigan affogato. YOLO leggings VHS banjo, pinterest stumptown man bun migas try-hard tbh iceland copper mug quinoa. Celiac waistcoat gochujang, food truck tbh asymmetrical mixtape franzen edison bulb vaporware tacos. Asymmetrical pitchfork tilde, la croix snackwave kitsch man bun 3 wolf moon. Tumblr af offal pork belly, taxidermy neutra brooklyn whatever echo park cardigan ethical subway tile ugh butcher. Microdosing vinyl flannel vice austin.",
      slug: "general_demographic_report"
    },
    {
      name: "NC Voter Plus Report",
      description: "Ennui tousled austin biodiesel, messenger bag dreamcatcher kickstarter locavore. ",
      slug: "general_demographic_report"
    },
    {
      name: "General Demographic Report",
      description: "Man bun stumptown mumblecore, shabby chic vexillologist artisan lo-fi yr migas keytar 3 wolf moon. Kinfolk craft beer helvetica occupy vaporware, you probably haven't heard of them lo-fi succulents polaroid blue bottle copper mug church-key wolf thundercats literally. Farm-to-table chambray ramps squid.",
      slug: "general_demographic_report"
    },
    {
      name: "Longitudinal Population Report",
      description: "Affogato raclette banh mi crucifix godard occupy. Twee lo-fi chia flannel tofu poke. Before they sold out semiotics deep v mlkshk meditation ugh, la croix blue bottle readymade kickstarter sriracha. Post-ironic mlkshk normcore cred shabby chic echo park, lo-fi VHS neutra gastropub coloring book.",
      slug: "general_demographic_report"
    },
    {
      name: "Age and Education Report",
      description: "Chambray squid listicle, kale chips coloring book church-key woke +1 hexagon venmo. Before they sold out man bun farm-to-table cardigan affogato. YOLO leggings VHS banjo, pinterest stumptown man bun migas try-hard tbh iceland copper mug quinoa. Celiac waistcoat gochujang, food truck tbh asymmetrical mixtape franzen edison bulb vaporware tacos. Asymmetrical pitchfork tilde, la croix snackwave kitsch man bun 3 wolf moon. Tumblr af offal pork belly, taxidermy neutra brooklyn whatever echo park cardigan ethical subway tile ugh butcher. Microdosing vinyl flannel vice austin.",
      slug: "general_demographic_report"
    },
    {
      name: "NC Voter Plus Report",
      description: "Ennui tousled austin biodiesel, messenger bag dreamcatcher kickstarter locavore. ",
      slug: "general_demographic_report"
    }
  ];

  public selectedReport:any = this.reports[0];
  @Output() selectedReportChange:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public setReport(report){
    this.selectedReport = report;
    this.selectedReportChange.emit(this.selectedReport);
  }
}
