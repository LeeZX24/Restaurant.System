import { ControlValueAccessor, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { CustomLabelFormControlBase, CustomLabelFormControlBaseOption, CustomLabelFormControlBaseOptions } from "../../base/custom-label-form-control-base/custom-label-form-control-base";

export class CustomLabelTextFormControlOptions extends CustomLabelFormControlBaseOptions {
  static readonly mask = 'mask';
  static readonly minlength = 'minlength';
  static readonly maxlength = 'maxlength';
  static readonly placeholder = 'placeholder';
  static readonly mask_validation = 'mask_validation';
  static readonly readonly = 'readonly';
  static readonly capitalized = 'capitalized';

};

export interface CustomTextLabelFormControlOption extends CustomLabelFormControlBaseOption {
  mask?: string;
  minlength?: number;
  maxlength?: number;
  placeholder?: string;
  mask_validation?: boolean;
  readonly?: boolean;
  capitalized?: boolean;
}

export class CustomLabelTextFormControl extends CustomLabelFormControlBase {
  mask!: string;
  minlength!: number;
  maxlength!: number;
  placeholder!: string;
  mask_validation!: boolean;
  readonly!: boolean;
  capitalized!: boolean;

  constructor(label: string, options: CustomTextLabelFormControlOption, value: any, validator: any = null) {
    super(label, options, value, validator);
    this._setOptions();
  }

  override refresh(): void {
    this._setOptions();
    this._setValidators();
  }

  private _setOptions() {
    this.mask = this.getOptionItem(CustomLabelTextFormControlOptions.mask);
    this.minlength = this.getOptionItem(CustomLabelTextFormControlOptions.minlength);
    this.maxlength = this.getOptionItem(CustomLabelTextFormControlOptions.maxlength);
    this.placeholder = this.getOptionItem(CustomLabelTextFormControlOptions.placeholder);
    this.mask_validation = this.getOptionItem(CustomLabelTextFormControlOptions.mask_validation);
    this.readonly = this.getOptionItem(CustomLabelTextFormControlOptions.readonly);
    this.capitalized = this.getOptionItem(CustomLabelTextFormControlOptions.capitalized);
  }

  private _setValidators() {
    this.validators = this.getCustomValidators();
    if(this.isRequired) this.validators.push(Validators.required);
    if(!!this.maxlength) this.validators.push(Validators.maxLength(this.maxlength));
    if(!!this.minlength) this.validators.push(Validators.minLength(this.minlength));

    this.clearValidators();
    this.setValidators(Validators.compose(this.validators));

    this.updValsAndValidities();
  }
}
