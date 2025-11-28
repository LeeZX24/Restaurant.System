import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSLabelFormControlBaseComponent } from './custom-label-form-control-base.component';

describe('RSLabelFormControlBaseComponent', () => {
  let component: RSLabelFormControlBaseComponent;
  let fixture: ComponentFixture<RSLabelFormControlBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RSLabelFormControlBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RSLabelFormControlBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
