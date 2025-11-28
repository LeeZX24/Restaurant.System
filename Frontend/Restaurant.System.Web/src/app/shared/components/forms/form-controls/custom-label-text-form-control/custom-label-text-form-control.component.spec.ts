import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RSLabelTextFormControlComponent } from './custom-label-text-form-control.component';

describe('RSLabelTextFormControlComponent', () => {
  let component: RSLabelTextFormControlComponent;
  let fixture: ComponentFixture<RSLabelTextFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RSLabelTextFormControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RSLabelTextFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
