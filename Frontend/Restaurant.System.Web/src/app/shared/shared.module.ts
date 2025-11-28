import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorConverterPipe } from "./pipes/error-converter-pipe";

export const SHARED_IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule
];

export const SHARED_EXPORTS = [
  ErrorConverterPipe
];
