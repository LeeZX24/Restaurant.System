import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorConverterPipe } from "./pipes/error-converter-pipe";
import { NgxMaskDirective } from 'ngx-mask';

export const SHARED_IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  NgxMaskDirective
];

export const SHARED_EXPORTS = [
  ErrorConverterPipe
];
