import { Validators } from "@angular/forms";
import { RSFormValidators, RSLabelFormControlBase, RSLabelFormControlBaseOption, RSLabelFormControlBaseOptions } from "../../base/custom-label-form-control-base/custom-label-form-control-base";

export class RSLabelTextFormControlOptions extends RSLabelFormControlBaseOptions {
  static readonly mask = 'mask';
  static readonly minlength = 'minlength';
  static readonly maxlength = 'maxlength';
  static readonly placeholder = 'placeholder';
  static readonly mask_validation = 'mask_validation';
  static readonly readonly = 'readonly';
  static readonly capitalized = 'capitalized';

};

export interface RSLabelTextFormControlOption extends RSLabelFormControlBaseOption {
  mask?: string;
  minlength?: number;
  maxlength?: number;
  placeholder?: string;
  mask_validation?: boolean;
  readonly?: boolean;
  capitalized?: boolean;
}

export class RSLabelTextFormControl extends RSLabelFormControlBase {
  mask!: string;
  minlength!: number;
  maxlength!: number;
  placeholder!: string;
  mask_validation!: boolean;
  readonly!: boolean;
  capitalized!: boolean;

  constructor(label: string, options: RSLabelTextFormControlOption, value: unknown, validator: RSFormValidators = null) {
    super(label, options, value, validator);
    this._setOptions();
  }

  override refresh(): void {
    this._setOptions();
    this._setValidators();
  }

  private _setOptions() {
    this.mask = this.getOptionItem(RSLabelTextFormControlOptions.mask) ?? '';
    this.minlength = this.getOptionItem(RSLabelTextFormControlOptions.minlength) ?? 0;
    this.maxlength = this.getOptionItem(RSLabelTextFormControlOptions.maxlength) ?? 0;
    this.placeholder = this.getOptionItem(RSLabelTextFormControlOptions.placeholder) ?? '';
    this.mask_validation = this.getOptionItem(RSLabelTextFormControlOptions.mask_validation) ?? false;
    this.readonly = this.getOptionItem(RSLabelTextFormControlOptions.readonly) ?? false;
    this.capitalized = this.getOptionItem(RSLabelTextFormControlOptions.capitalized) ?? false;
  }

  private _setValidators() {
    this.validators = this.getCustomValidators();
    if(this.isRequired) this.validators.push(Validators.required);
    if(this.maxlength) this.validators.push(Validators.maxLength(this.maxlength));
    if(this.minlength) this.validators.push(Validators.minLength(this.minlength));

    this.clearValidators();
    this.setValidators(Validators.compose(this.validators));

    this.updValsAndValidities();
  }
}
