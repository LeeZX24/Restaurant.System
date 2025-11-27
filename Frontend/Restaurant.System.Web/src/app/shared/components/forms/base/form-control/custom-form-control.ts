import { ValidatorFn, Validators } from "@angular/forms";
import { CustomFormControlBase, FCType } from "./form-control-base";
import { Subject } from "rxjs";
import { Dictionary } from "../../../../../utils/dictionary";


export class CustomFormControl extends CustomFormControlBase {
  constructor(formState?: any, validatorOrOpts?: ValidatorFn[] | null) {
    if (!!formState) {
      const fsKyes = Object.keys(formState);
      if (fsKyes.length === 1 && fsKyes[0].toLowerCase() === 'value') {
        formState = formState['value'];
      }
    }
    super(formState);
    if (!!validatorOrOpts && validatorOrOpts.length > 0) {
      this.setValidators(validatorOrOpts);
    }
    this.configChange$ = new Subject<void>();
  }

  public configChange$: Subject<void>;

  public get ui(): ICustomFormControlUI {
    const ths = this;
    return {
      setType(value: FCType): CustomFormControl {
        ths._type = value;
        ths.configChange$.next();
        return ths;
      },
      setLabel(value: string): CustomFormControl {
        ths._label = value;
        ths.configChange$.next();
        return ths;
      },
      setVisible(value): CustomFormControl {
        ths._visible = value === true ? true : false;
        ths.configChange$.next();
        return ths;
      },
      setPosition(row: number, col: number, tab: number = 0): void {
        tab = tab || 0;
        const fgPositions = new Dictionary(ths.__fg.customFormControlsDict).values.map(fc => fc.position);
        // if position row is taken
        if (fgPositions.some(x => x[0] === col && x[1] === row && x[2] === tab)) {
          const rowNumbers = fgPositions.filter(p => p[0] === col && p[2] === tab).map(p => p[1]);
          row = rowNumbers.sort((a, b) => b - a)[0] + 1;
        }
        ths._position = [row, col, tab];
        ths.configChange$.next();
      }
    };
  }

  /**
   * sets maximum max len that user can try input
   *
   */
  public setForceMaxLen(value: number): CustomFormControl { this._forceMaxLen = value; return this; }
  public setMin(value: number): CustomFormControl {
    this._min = value;
    this.updateValidators();
    return this;
  }

  public setMax(value: number): CustomFormControl {
    this._max = value;
    this.updateValidators();
    this.setValidators([Validators.max(value)]); return this;
  }

  /**
   * sets mimimum valid length of value
   *
   */
  public setMinLen(value: number): CustomFormControl {
    this._minLen = value;
    this.updateValidators();
    return this;
  }

  /**
   * sets maximum valid length of value
   *
   */
  public setMaxLen(value: number): CustomFormControl {
    this._maxLen = value;
    this.updateValidators();
    return this;
  }

  public setDisabled(value: any): CustomFormControl { value === true ? this.disable() : this.enable(); return this; }
  public setRequired(value: boolean): CustomFormControl {
    this._required = value;
    this.updateValidators();
    return this;
  }

  /**
   * sets the pattern that user can try input
   *
   */
  public setForcePattern(value: string): CustomFormControl { this._forcePattern = value; return this; }
  public setPattern(value: string): CustomFormControl {
    this._pattern = value;
    this.updateValidators();
    return this;
  }

  public setIsEmail(value: boolean): CustomFormControl {
    this._isEmail = value;
    this.updateValidators();
    return this;
  }

  public _hasValidator(validatorName: string): boolean {
    if (!this.validator) {
      return false;
    }
    return (x => x !== null && x[validatorName] === true)(this.validator(new CustomFormControl()));
  }

  public get isRequired(): boolean {
    if (!this.validator) {
      return false;
    }
    return this.required || (x => x !== null && x["required"] === true)(this.validator(new CustomFormControl()));
  }
}

export interface ICustomFormControlUI {
    setType(value: FCType): CustomFormControl;
    setLabel(value: string): CustomFormControl;
    setVisible(value: any): CustomFormControl;
    /**
     * sets the position of form control input in form appearance
     */
    setPosition(row: number, col: number, tab?: number): void;
}
