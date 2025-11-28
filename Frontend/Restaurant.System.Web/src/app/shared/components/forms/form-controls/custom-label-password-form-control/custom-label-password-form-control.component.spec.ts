import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSLabelPasswordFormControlComponent } from './custom-label-password-form-control.component';

describe('RSLabelPasswordFormControlComponent', () => {
  let component: RSLabelPasswordFormControlComponent;
  let fixture: ComponentFixture<RSLabelPasswordFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RSLabelPasswordFormControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RSLabelPasswordFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
