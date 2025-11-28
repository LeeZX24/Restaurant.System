import { FormControl, FormControlOptions, FormGroup, ValidatorFn } from "@angular/forms";

export type RSFormValidators = ValidatorFn | ValidatorFn[] | FormControlOptions | null;

export class RSLabelFormControlBaseOptions {
  static readonly customValidationErrors = 'customValidationErrors';
  static readonly required = 'required';
  static readonly elementCssClass = 'elementCssClass';
}

export interface RSLabelFormControlBaseOption {
  customValidationErrors?: Record<string,string>,
  required?: boolean,
  elementCssClass?: string
}

export abstract class RSLabelFormControlBase extends FormControl {
  label!: string;
  options!: RSLabelFormControlBaseOption;

  protected validators: ValidatorFn[] = [];
  protected customValidators: ValidatorFn[] = [];

  abstract refresh(): void;

  constructor(
    label: string,
    options: RSLabelFormControlBaseOption,
    value: unknown,
    validators: RSFormValidators,
  ) {
    super(value, validators);

    this.label = label;
    this.options = options;
  }

  writeValue<T>(value: T): void {
    this.setValue(value);
  }

  setDisabledState(disabled: boolean) {
    if(disabled) this.disable()
    else this.enable();
  }

  // Flag to show errors
  get isErrorToShow(): boolean {
    return this.touched && this.invalid && !this.disabled;
  }

  getValidationMessages(): string[] {
    const messages: string[] = [];
    if (this.errors) {
      for (const errorKey in this.errors) {
        switch (errorKey) {
          case 'required':
            this._addValidationMessage('required', '', messages);
            messages.push('This field is required');
            break;
          case 'minlength':
            this._addValidationMessage('minlength', '', messages);
            messages.push(`Minimum length ${this.errors[errorKey].requiredLength}`);
            break;
          case 'maxlength':
            this._addValidationMessage('maxlength', '${this.label}', messages);
            messages.push(`Maximum length ${this.errors[errorKey].requiredLength}`);
            break;
          case 'min':
            this._addValidationMessage('min', '${this.label}', messages);
            //messages.push(`Minimum length ${this.errors[errorKey].requiredLength}`);
            break;
          case 'max':
            this._addValidationMessage('max', '${this.label}', messages);
            //messages.push(`Maximum length ${this.errors[errorKey].requiredLength}`);
            break;
          case 'pattern':
            this._addValidationMessage('pattern', '${this.label}', messages);
            //messages.push(`Minimum length ${this.errors[errorKey].requiredLength}`);
            break;
          case 'nozero':
            this._addValidationMessage('nozero', '${this.label}', messages);
            //messages.push(`Maximum length ${this.errors[errorKey].requiredLength}`);
            break;
          case 'email':
            this._addValidationMessage('email', '${this.label}', messages);
            //messages.push('Invalid email format');
            break;
          default:
            this._addValidationMessage(errorKey, '${this.label}', messages);
            //messages.push('Invalid value');
        }
      }
    }

    return messages;
  }

  // Optional: disabled-required error
  get isDisabledRequiredError(): boolean {
    if(!this.parent)
      return false;

    const ctrlProps: boolean = this.touched && this.isRequired && this.disabled && this.value == null;
    const formEnabled = !this.parent.disabled;
    return ctrlProps && formEnabled;
  }

  getDisableRequireMsg(): string {
    return 'This required field is disabled'; // You can customize
  }

  private _addValidationMessage(key: string, autoValidationMessage: string, messages: string[]) {
    const msg = this._getCustomValidationMessage(key);
    if (msg)
        messages.push(msg);
    else
        messages.push(autoValidationMessage);
  }

  private _getCustomValidationMessage(validationName: string) {
    const customValidationErrors = this.getOptionItem<Record<string,string>>(RSLabelFormControlBaseOptions.customValidationErrors);
    return customValidationErrors?.[validationName] ?? null;
  }

  getOptionItem<T = unknown>(key:string): T | null {
    const optList = this.options as Record<string, unknown>;
    if(optList[key] !== null && optList[key] !== undefined)
      return optList[key] as T;

    return null;
  }

  get isRequired(): boolean {
      return !!this.getOptionItem(RSLabelFormControlBaseOptions.required);
  }

  get elementCssClass() {
    let cssClasses = this.getOptionItem(RSLabelFormControlBaseOptions.elementCssClass) as string;

      if (!cssClasses)
          cssClasses = '';
      if (this.isRequired)
          cssClasses += ' required';
      if (this.isErrorToShow)
          cssClasses += ' border border-danger';

      return cssClasses;
  }

  setOptionItem(key: string, value: unknown, appendValue = false) {
    let optList = this.options as Record<string, unknown>;
    if (!optList)
      optList = {};

    if (!appendValue)
        optList[key] = value;
    else {
      const currentValue = optList[key];
      if (currentValue)
        optList[key] = currentValue + ' ' + value;
      else
        optList[key] = value;
    }

    this.refresh();
  }

  public setCustomValidators(validators: ValidatorFn[]): void {
    this.customValidators = Object.assign([], validators);
    this.refresh();
  }

  public getCustomValidators(): ValidatorFn[] {
    return Object.assign([], this.customValidators);
  }

  // protected getDataItems<T>(titleField: T, valueField: T, errorMessage: T, dataField: T, compositeTitle: (x: T) => string) {
  //   if ((!titleField && !compositeTitle) || !valueField)
  //       throw (errorMessage);

  //   const data: T[] = this.getOptionItem(dataField);

  //   if (!data)
  //     return null;

  //   return data.map(x => ({
  //     value: x[valueField],
  //     title: compositeTitle ? compositeTitle(x) : x[titleField]
  //   }));
  // }

  formatMinValue<T>(value: T) {
    return value;
  }

  formatMaxValue<T>(value: T) {
    return value;
  }

  protected updValsAndValidities(): void {
        this.updateValueAndValidity();
        const formGroup = this.parent as FormGroup;
        if (formGroup) {
            formGroup.updateValueAndValidity();
        }
    }
}
