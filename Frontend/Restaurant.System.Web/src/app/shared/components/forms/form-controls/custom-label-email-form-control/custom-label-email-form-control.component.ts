import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RSLabelTextFormControl } from '../custom-label-text-form-control/custom-label-text-form-control';
import { RSLabelFormControlBaseComponent } from '../../base/custom-label-form-control-base/custom-label-form-control-base.component';
import { NgxMaskDirective } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'rs-label-email-form-control',
  imports: [NgClass, RSLabelFormControlBaseComponent, CommonModule, ReactiveFormsModule, FormsModule, NgxMaskDirective],
  templateUrl: './custom-label-email-form-control.component.html',
  styleUrl: './custom-label-email-form-control.component.css',
})
export class RSLabelEmailFormControlComponent implements OnInit {
  @Input() fc!: RSLabelTextFormControl;
  @Input() labelSize = 'w-full md:basis-1/4';
  @Input() inputSize = 'w-full md:basis-3/4';

  @ViewChild("input") private _input!: ElementRef;

  ngOnInit() {
    if (!(this.fc instanceof RSLabelTextFormControl)) {
      throw `You are using ${this.fc['constructor']['name']} in ${this.constructor.name}`;
    }
  }

  focus(): void {
    this._input.nativeElement.focus();
  }

  convertToUppercase(event: Event): void {
    if (this.fc.capitalized) {
      const elem = event.target as HTMLInputElement;
      const startPos = elem.selectionStart;
      const endPos = elem.selectionEnd;
      elem.value = elem.value.toUpperCase();
      elem.setSelectionRange(startPos, endPos);
      this.fc.setValue(elem.value.toUpperCase());
    }
  }
}
