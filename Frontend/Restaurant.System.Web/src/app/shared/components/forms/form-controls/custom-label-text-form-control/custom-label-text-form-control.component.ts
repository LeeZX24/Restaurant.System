import { Component, Input } from '@angular/core';
import { CustomLabelFormControlBaseComponent } from "../base/custom-label-form-control-base/custom-label-form-control-base.component";
import { CustomLabelTextFormControl } from './custom-label-text-form-control';

@Component({
  selector: 'app-custom-label-text-form-control.component',
  imports: [CustomLabelFormControlBaseComponent],
  templateUrl: './custom-label-text-form-control.component.html',
  styleUrl: './custom-label-text-form-control.component.css',
})
export class CustomLabelTextFormControlComponent {
  @Input() fc!: CustomLabelTextFormControl;
  @Input() labelSize: string = '';
  @Input() inputSize: string = '';
}
