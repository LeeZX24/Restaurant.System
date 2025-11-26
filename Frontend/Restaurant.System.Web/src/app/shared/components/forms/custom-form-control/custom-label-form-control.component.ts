// import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
// import { CustomLabelFormControlBase } from '../custom-label-form-control-base/custom-label-form-control-base';
import { SHARED_IMPORTS } from '../../../shared.module';

@Component({
  selector: 'custom-form-control',
  imports: [...SHARED_IMPORTS],
  templateUrl: './custom-label-form-control.component.html',
  styleUrl: './custom-label-form-control.component.css',
})
export class CustomLabelFormControlComponent {
  @Input() colLabelSize!: string;
  @Input() colInputSize!: string;
  // @Input() fc!: CustomLabelFormControlBase;
}
