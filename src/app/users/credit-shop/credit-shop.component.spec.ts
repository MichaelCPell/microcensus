/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreditShopComponent } from './credit-shop.component';

describe('CreditShopComponent', () => {
  let component: CreditShopComponent;
  let fixture: ComponentFixture<CreditShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
