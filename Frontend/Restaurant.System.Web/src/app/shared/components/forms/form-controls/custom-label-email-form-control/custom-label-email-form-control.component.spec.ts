import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabelEmailFormControlComponent } from './custom-label-email-form-control.component';

describe('CustomLabelEmailFormControlComponent', () => {
  let component: CustomLabelEmailFormControlComponent;
  let fixture: ComponentFixture<CustomLabelEmailFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomLabelEmailFormControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLabelEmailFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
