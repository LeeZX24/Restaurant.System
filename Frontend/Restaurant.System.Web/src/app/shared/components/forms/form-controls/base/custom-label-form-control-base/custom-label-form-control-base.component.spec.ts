import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLabelFormControlBaseComponent } from './custom-label-form-control-base.component';

describe('CustomLabelFormControlBaseComponent', () => {
  let component: CustomLabelFormControlBaseComponent;
  let fixture: ComponentFixture<CustomLabelFormControlBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomLabelFormControlBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLabelFormControlBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
