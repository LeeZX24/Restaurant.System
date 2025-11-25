import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export interface CSLabelElementFocusable {
    focus(): void;
}

export class CustomFormControlBaseOptions {
  static readonly customValidationError = 'customValidationError';
  static readonly required = 'required';
  static readonly elementCssClass = 'elementCssClass';
}

export interface CustomFormControlBaseOption {
  customValidationError?: { [ key: string ]: string },
  required?: boolean,
  elementCssClass?: string
}

export abstract class CustomFormControlBase extends FormControl {
  label: string;
  options: CustomFormControlBaseOption;
  labelElement: unknown;

  protected validators: ValidatorFn[] = [];
  protected customValidators: ValidatorFn[] = [];

  abstract refresh(): void;

  constructor(
      label: string,
      options: CustomFormControlBaseOption,
      value: unknown,
      validator: unknown
  ) {
      super(value, validator);
      this.label = label;
      this.options = options;
  }

  getValidationMessages() {
        let messages: string[] = [];
        if (!!this.errors) {
            for (let errorName in this.errors)
                switch (errorName) {
                    case 'required':
                        this._addValidationMessage('required', `project.baseControls.errors.required;${this.label}`, messages);
                        break;
                    case 'minlength':
                        this._addValidationMessage('minlength', `project.baseControls.errors.minlength;${this.label};${this.errors['minlength'].requiredLength}`, messages);
                        break;
                    case 'maxlength':
                        this._addValidationMessage('maxlength', `project.baseControls.errors.maxlength;${this.label};${this.errors['maxlength'].requiredLength}`, messages);
                        break;
                    case 'min':
                        this._addValidationMessage('min', `project.baseControls.errors.min;${this.label};${this.formatMinValue(this.errors['min'].min)}`, messages);
                        break;
                    case 'max':
                        this._addValidationMessage('max', `project.baseControls.errors.max;${this.label};${this.formatMaxValue(this.errors['max'].max)}`, messages);
                        break;
                    case 'pattern':
                        this._addValidationMessage('pattern', `project.baseControls.errors.pattern;${this.label}`, messages);
                        break;
                    case 'nozero':
                        this._addValidationMessage('nozero', `project.baseControls.errors.nozero;${this.label}`, messages);
                        break;
                    default:
                        this._addValidationMessage(errorName, `project.baseControls.errors.custom;${errorName}`, messages);
                }
        }
        return messages;
    }

    public getDisableRequireMsg(): string {
        const err: string = `project.baseControls.errors.required;${this.label}`;
        return err;
    }

    private _getCustomValidationMessage(validationName: string) {
        const customValidationErrors = this.getOptionItem(CustomFormControlBaseOptions.customValidationError);
        if (customValidationErrors && customValidationErrors[validationName])
            return customValidationErrors[validationName];

        return null;
    }

    private _addValidationMessage(key: string, autoValidationMessage: string, messages: string[]) {
        if (this._getCustomValidationMessage(key))
            messages.push(this._getCustomValidationMessage(key));
        else
            messages.push(autoValidationMessage);
    }

    get isErrorToShow(): boolean {
        return this.touched && this.invalid;
    }

    get isDisabledRequiedError(): boolean {
        if (!this['__fg']) {
            return false;
        }

        const ctrlProps: boolean = this.touched && this.isRequired && this.disabled && this.value == null;
        const formEnabled: boolean = !this['__fg'].disabled;
        return ctrlProps && formEnabled;
    }

    get isRequired(): boolean {
        return !!this.getOptionItem(CustomFormControlBaseOptions.required);
    }

    get elementCssClass() {
        let cssClasses = this.getOptionItem(CustomFormControlBaseOptions.elementCssClass);

        if (!cssClasses)
            cssClasses = '';
        if (this.isRequired)
            cssClasses += ' required';
        if (this.isErrorToShow)
            cssClasses += ' border border-danger';

        return cssClasses;
    }

    getOptionItem(key: string) {
        if (this.options && (this.options[key] !== null && this.options[key] !== undefined))
            return this.options[key];

        return null;
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

    focus() {
        if (<CSLabelElementFocusable>this.labelElement !== undefined)
            (this.labelElement as CSLabelElementFocusable).focus();
        else
            throw `[focus] is not implemented in ${this.constructor.name}`;
    }

    /**
     * Update vals & validities of current control and parent form-group
     */
    protected updValsAndValidities(): void {
        this.updateValueAndValidity();
        const formGroup = this['__fg'] as FormGroup;
        if (!!formGroup) {
            formGroup.updateValueAndValidity();
        }
    }

    /**
     * Set all custom validators for the FormControl
     * @param validators Custom validator array
     */
    public setCustomValidators(validators: ValidatorFn[]): void {
        this.customValidators = ArrayUtil.copyFreshArray(validators);
        this.refresh();
    }

    /**
     * Get array of current custom validators of this form control.
     * @returns Array of current custom validators
     */
    public getCustomValidators(): ValidatorFn[] {
        return ArrayUtil.copyFreshArray(this.customValidators);
    }

    protected getDataItems(titleField, valueField, errorMessage, dataField, compositeTitle: (x: unknown) => string) {
        if ((!titleField && !compositeTitle) || !valueField)
            throw (errorMessage);


        const data: unknown[] = this.getOptionItem(dataField);

        if (!data)
            return null;

        return data.map(x => ({
            value: x[valueField],
            title: compositeTitle ? compositeTitle(x) : x[titleField]
        }));
    }

    formatMinValue(value) {
        return value;
    }

    formatMaxValue(value) {
        return value;
    }
}
