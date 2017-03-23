/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDashboardComponent } from './user-dashboard.component';
import { NavigationComponent } from '../../shared/navigation/navigation.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule } from "@angular/forms";
import { LocationFilterPipe } from "../../shared/location-filter.pipe";
import { ValuesPipe } from "../../shared/values.pipe";
import { RouterTestingModule } from "@angular/router/testing";
import { User } from '../user';
import { ResearchAreaService } from "../../shared/research-area.service";



describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      providers: [User, ResearchAreaService],
      declarations: [ UserDashboardComponent, NavigationComponent, FooterComponent, LocationFilterPipe, ValuesPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
