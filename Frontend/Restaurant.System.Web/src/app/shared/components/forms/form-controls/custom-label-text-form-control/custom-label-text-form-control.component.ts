import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CustomLabelFormControlBaseComponent } from "../../base/custom-label-form-control-base/custom-label-form-control-base.component";
import { CustomLabelTextFormControl } from './custom-label-text-form-control';
import { NgClass } from '@angular/common';
import { NgxMaskDirective } from "ngx-mask";
import { SHARED_EXPORTS, SHARED_IMPORTS } from '../../../../shared.module';

@Component({
  selector: 'custom-label-text-form-control.component',
  imports: [...SHARED_IMPORTS, ...SHARED_EXPORTS, NgClass, CustomLabelFormControlBaseComponent, NgxMaskDirective],
  templateUrl: './custom-label-text-form-control.component.html',
  styleUrl: './custom-label-text-form-control.component.css',
})
export class CustomLabelTextFormControlComponent implements OnInit {
  @Input() fc!: CustomLabelTextFormControl;
  @Input() labelSize: string = 'w-full md:w-2/5';
  @Input() inputSize: string = 'w-full md:w-3/5';

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
