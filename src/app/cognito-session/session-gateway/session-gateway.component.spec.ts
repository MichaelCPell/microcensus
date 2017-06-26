import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionGatewayComponent } from './session-gateway.component';

describe('SessionGatewayComponent', () => {
  let component: SessionGatewayComponent;
  let fixture: ComponentFixture<SessionGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
