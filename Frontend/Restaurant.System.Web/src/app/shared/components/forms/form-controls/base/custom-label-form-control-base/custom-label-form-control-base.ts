import { ControlValueAccessor, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export class CustomLabelFormControlBaseOptions {
  static readonly customValidationErrors = 'customValidationErrors';
  static readonly required = 'required';
  static readonly elementCssClass = 'elementCssClass';
}

export interface CustomLabelFormControlBaseOption {
  [key: string]: any;
  customValidationErrors?: { [key: string]: string },
  required?: boolean,
  elementCssClass?: string
}

export abstract class CustomLabelFormControlBase extends FormControl {
  label!: string;
  options!: CustomLabelFormControlBaseOption;

  protected validators: ValidatorFn[] = [];
  protected customValidators: ValidatorFn[] = [];

  abstract refresh(): void;

  constructor(
    label: string,
    options: CustomLabelFormControlBaseOption,
    value: any,
    validators: any,
  ) {
    super(value, validators);

    this.label = label;
    this.options = options;
  }

  writeValue(value: any): void {
    this.setValue(value);
  }

  setDisabledState(disabled: boolean) {
    disabled ? this.disable() : this.enable;
  }

  // Flag to show errors
  get isErrorToShow(): boolean {
    return this.touched && this.invalid && !this.disabled;
  }

  getValidationMessages(): string[] {
    const messages: string[] = [];
    if (!!this.errors) {
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
    const formEnabled: boolean = !this.parent.disabled;
    return ctrlProps && formEnabled;
  }

  getDisableRequireMsg(): string {
    return 'This required field is disabled'; // You can customize
  }

  private _addValidationMessage(key: string, autoValidationMessage: string, messages: string[]) {
      if (this._getCustomValidationMessage(key))
          messages.push(this._getCustomValidationMessage(key));
      else
          messages.push(autoValidationMessage);
  }

  private _getCustomValidationMessage(validationName: string) {
  const customValidationErrors = this.getOptionItem(CustomLabelFormControlBaseOptions.customValidationErrors);
  if (customValidationErrors && customValidationErrors[validationName])
      return customValidationErrors[validationName];

  return null;
  }

  getOptionItem(key:string) {
    if(this.options[key] !== null && this.options[key] !== undefined)
      return this.options[key];

    return null;
  }

  get isRequired(): boolean {
      return !!this.getOptionItem(CustomLabelFormControlBaseOptions.required);
  }

  get elementCssClass() {
    let cssClasses = this.getOptionItem(CustomLabelFormControlBaseOptions.elementCssClass);

      if (!cssClasses)
          cssClasses = '';
      if (this.isRequired)
          cssClasses += ' required';
      if (this.isErrorToShow)
          cssClasses += ' border border-danger';

      return cssClasses;
  }

  setOptionItem(key: string, value: unknown, appendValue: boolean = false) {
    if (!this.options)
      this.options = {};

    if (!appendValue)
        this.options[key] = value;
    else {
      const currentValue = this.options[key];
      if (currentValue)
        this.options[key] = currentValue + ' ' + value;
      else
        this.options[key] = value;
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

  protected getDataItems(titleField: any, valueField: any, errorMessage: any, dataField: any, compositeTitle: (x: any) => string) {
    if ((!titleField && !compositeTitle) || !valueField)
        throw (errorMessage);

    const data: any[] = this.getOptionItem(dataField);

    if (!data)
      return null;

    return data.map(x => ({
      value: x[valueField],
      title: compositeTitle ? compositeTitle(x) : x[titleField]
    }));
  }

  formatMinValue(value: any) {
    return value;
  }

  formatMaxValue(value: any) {
    return value;
  }

  protected updValsAndValidities(): void {
        this.updateValueAndValidity();
        const formGroup = this.parent as FormGroup;
        if (!!formGroup) {
            formGroup.updateValueAndValidity();
        }
    }
}
