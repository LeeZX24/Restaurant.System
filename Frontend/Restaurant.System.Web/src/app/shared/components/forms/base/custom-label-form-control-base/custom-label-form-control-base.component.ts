import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgClass, isPlatformBrowser } from '@angular/common';
import { RSLabelFormControlBase } from './custom-label-form-control-base';
import { ErrorConverterPipe } from '../../../../pipes/error-converter-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'rs-label-form-control-base',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgClass, ErrorConverterPipe],
  templateUrl: './custom-label-form-control-base.component.html',
  styleUrl: './custom-label-form-control-base.component.css'
})
export class RSLabelFormControlBaseComponent {
  @Input() labelSize!: string;
  @Input() inputSize!: string;
  @Input() fc!: RSLabelFormControlBase;

  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
}
