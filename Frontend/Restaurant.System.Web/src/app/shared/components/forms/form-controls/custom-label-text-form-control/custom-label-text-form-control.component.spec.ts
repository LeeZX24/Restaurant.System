import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabelTextFormControlComponent } from './custom-label-text-form-control.component';

describe('CustomLabelTextFormControlComponent', () => {
  let component: CustomLabelTextFormControlComponent;
  let fixture: ComponentFixture<CustomLabelTextFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomLabelTextFormControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLabelTextFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
