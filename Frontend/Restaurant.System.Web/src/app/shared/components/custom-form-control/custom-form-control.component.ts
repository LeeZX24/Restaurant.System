import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-form-control',
  imports: [NgClass],
  templateUrl: './custom-form-control.component.html',
  styleUrl: './custom-form-control.component.css',
})
export class CustomFormControlComponent {
  @Input() colLabelSize: string;
  @Input() colInputSize: string;
  @Input() label: string;
}
