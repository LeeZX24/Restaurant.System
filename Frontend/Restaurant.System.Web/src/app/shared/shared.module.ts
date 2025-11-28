import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorConverterPipe } from "./pipes/error-converter-pipe";
import { RSLabelEmailFormControlComponent } from "./components/forms/form-controls/custom-label-email-form-control/custom-label-email-form-control.component";
import { RSLabelPasswordFormControlComponent } from "./components/forms/form-controls/custom-label-password-form-control/custom-label-password-form-control.component";
import { RSLabelTextFormControlComponent } from "./components/forms/form-controls/custom-label-text-form-control/custom-label-text-form-control.component";

export const SHARED_IMPORTS = [
  CommonModule,
];

export const SHARED_FORM_MODULE = [
  ReactiveFormsModule,
  FormsModule
];

export const SHARED_EXPORTS = [
  ErrorConverterPipe
];

export const SHARED_GENERAL_FORM_CONTROLS = [
  RSLabelTextFormControlComponent
];

export const SHARED_AUTH_FORM_CONTROLS = [
  RSLabelEmailFormControlComponent,
  RSLabelPasswordFormControlComponent
];
