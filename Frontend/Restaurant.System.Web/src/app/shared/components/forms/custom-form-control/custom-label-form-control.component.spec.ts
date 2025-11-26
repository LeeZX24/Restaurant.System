import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabelFormControlComponent } from './custom-label-form-control.component';

describe('CustomFormControl', () => {
  let component: CustomLabelFormControlComponent;
  let fixture: ComponentFixture<CustomLabelFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomLabelFormControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLabelFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
