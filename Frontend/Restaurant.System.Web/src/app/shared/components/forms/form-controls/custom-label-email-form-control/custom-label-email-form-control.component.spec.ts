import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSLabelEmailFormControlComponent } from './custom-label-email-form-control.component';

describe('RSLabelEmailFormControlComponent', () => {
  let component: RSLabelEmailFormControlComponent;
  let fixture: ComponentFixture<RSLabelEmailFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RSLabelEmailFormControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RSLabelEmailFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
