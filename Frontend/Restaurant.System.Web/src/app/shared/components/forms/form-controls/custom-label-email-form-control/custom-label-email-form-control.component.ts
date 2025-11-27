import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { SHARED_EXPORTS, SHARED_IMPORTS } from '../../../../shared.module';
import { CustomLabelTextFormControl } from '../custom-label-text-form-control/custom-label-text-form-control';
import { CustomLabelFormControlBaseComponent } from '../../base/custom-label-form-control-base/custom-label-form-control-base.component';

@Component({
  selector: 'custom-label-email-form-control',
  imports: [...SHARED_IMPORTS, ...SHARED_EXPORTS, NgClass, CustomLabelFormControlBaseComponent],
  templateUrl: './custom-label-email-form-control.component.html',
  styleUrl: './custom-label-email-form-control.component.css',
})
export class CustomLabelEmailFormControlComponent implements OnInit {
  @Input() fc!: CustomLabelTextFormControl;
  @Input() labelSize: string = 'col-lg-4';
  @Input() inputSize: string = 'col-lg-6';

  @ViewChild("input") private _input!: ElementRef;

  ngOnInit() {
    if (!(this.fc instanceof CustomLabelTextFormControl)) {
      throw `You are using ${this.fc['constructor']['name']} in ${this.constructor.name}`;
    }
  }

  focus(): void {
    this._input.nativeElement.focus();
  }

  convertToUppercase(event: Event): void {
    if (this.fc.capitalized) {
      var elem = event.target as HTMLInputElement;
      const startPos = elem.selectionStart;
      const endPos = elem.selectionEnd;
      elem.value = elem.value.toUpperCase();
      elem.setSelectionRange(startPos, endPos);
      this.fc.setValue(elem.value.toUpperCase());
    }
  }
}
