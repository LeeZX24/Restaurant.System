import { FormControl, ValidatorFn, Validators } from "@angular/forms";
import { CustomFormGroup } from "../../form-groups/form-group";

export abstract class CustomFormControlBase extends FormControl {
  protected __fg!: CustomFormGroup;
  protected _label = '';
  protected _visible = true;
  protected _forceMaxLen!: number;
  protected _forcePattern!: string;
  protected _required!: boolean;
  protected _pattern!: string;
  protected _isEmail!: boolean;
  protected _min!: number;
  protected _max!: number;
  protected _minLen!: number;
  protected _maxLen!: number;
  protected _position: number[] = [];
  protected _type!: FCType;
  protected validatorsConfig: IValidationConfig = {};

  public validationMessages: IValidationMessage = {};
  public get label() { return this._label; }
  public get visible() { return this._visible === false ? false : true; }
  public get forceMaxLen() { return this._forceMaxLen; }
  public get forcePattern() { return this._forcePattern; }
  public get required() { return this._required; }
  public get pattern() { return this._pattern; }
  public get isEmail() { return this._isEmail; }
  public get min() { return this._min; }
  public get max() { return this._max; }
  public get minLen() { return this._minLen; }
  public get maxLen() { return this._maxLen; }
  public get position() { return this._position; }
  public get type() { return this._type; }

  public updateValidators(): void {
    const validators: ValidatorFn[] = [];
    if (this.required === true) {
      validators.push(Validators.required);
    }
    if (this.min !== null && this.min !== undefined) {
      validators.push(Validators.min(this.min));
    }
    if (this.max !== null && this.max !== undefined) {
      validators.push(Validators.max(this.max));
    }
    if (this.minLen !== null && this.minLen !== undefined) {
      validators.push(Validators.minLength(this.minLen));
    }
    if (this.maxLen !== null && this.maxLen !== undefined) {
      validators.push(Validators.maxLength(this.maxLen));
    }
    if (this.pattern !== null && this.maxLen !== undefined) {
      validators.push(Validators.pattern(this.pattern));
    }
    if (this.isEmail === true) {
      validators.push(Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"));
    }
    super.setValidators([...validators, ...this.validatorsConfig.others || []]);
  }

  public override setValidators(newValidator: ValidatorFn[]): void {
    this.validatorsConfig.others = newValidator;
    this.updateValidators();
  }
}

export enum FCType {
    Number,
    Text,
    Date,
    List,
    Name,
    AlphNum,
    CheckBox,
    YesNo,
}

export interface IValidationMessage {
    required?: string;
    max?: string;
    min?: string;
    maxLen?: string;
    minLen?: string;
    email?: string;
    notmatch?: string;
}

export interface IValidationConfig {
    required?: boolean;
    max?: string;
    min?: string;
    maxLen?: string;
    minLen?: string;
    email?: string;
    others?: ValidatorFn[];
}
