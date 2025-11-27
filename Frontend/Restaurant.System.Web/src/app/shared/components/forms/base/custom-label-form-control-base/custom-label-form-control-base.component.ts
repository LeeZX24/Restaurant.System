import { Component, Input } from '@angular/core';
import { SHARED_EXPORTS, SHARED_IMPORTS } from '../../../../shared.module';
import { NgClass } from '@angular/common';
import { CustomLabelFormControlBase } from './custom-label-form-control-base';

@Component({
  selector: 'custom-label-form-control-base',
  imports: [...SHARED_IMPORTS, ...SHARED_EXPORTS, NgClass],
  templateUrl: './custom-label-form-control-base.component.html',
  styleUrl: './custom-label-form-control-base.component.css'
})
export class CustomLabelFormControlBaseComponent {
  @Input() labelSize!: string;
  @Input() inputSize!: string;
  @Input() fc!: CustomLabelFormControlBase;
}
