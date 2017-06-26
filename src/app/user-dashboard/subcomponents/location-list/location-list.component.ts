import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../../../models/location';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  @Input() locations:Location[];
  @Input() filterQuery:string;

  constructor() { }

  ngOnInit() {
  }

}
