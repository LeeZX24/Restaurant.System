import { Dictionary } from '../../../../utils/dictionary';
import { CustomFormControl } from '../base/form-control/custom-form-control';
import { CustomFormArrayBase, CustomFormElementType } from './../base/form-control/form-array-base';
import { FormGroup, ValidatorFn } from "@angular/forms";

export class CustomFormGroup extends FormGroup {
  public override controls: Record<string,CustomFormElementType> = {};
  constructor(
    controls?: Record<string,CustomFormElementType>,
    validatorOrOpts?: ValidatorFn[] | null) {
      super({});
      if (controls) {
          Object.keys(controls).map(k => {
              const elem = controls[k];
              this.addControl(k, elem);
          });
      }
      this.setValidators(validatorOrOpts!);
  }

  get controlsDict(): Dictionary<CustomFormElementType> {
      return new Dictionary(this.controls);
  }

  //Form Control
  get customFormControlsDict(): Record<string, CustomFormControl> {
      return this.controlsDict.ofKeys<CustomFormControl>(this.controlsDict.keys.filter(k => this.controls[k] instanceof CustomFormControl));
  }

  get customFormControls(): CustomFormControl[] {
      return this.controlsDict.values.filter(x => x instanceof CustomFormControl).map(x => x as CustomFormControl);
  }
  //Form Array
  get customFormArraysDict(): Record<string, CustomFormArrayBase> {
      return this.controlsDict.ofKeys<CustomFormArrayBase>(this.controlsDict.keys.filter(k => this.controls[k] instanceof CustomFormArrayBase));
  }

  get customFormArrays(): CustomFormArrayBase[] {
      return this.controlsDict.values.filter(x => x instanceof CustomFormArrayBase).map(x => x as CustomFormArrayBase);
  }
  //Form Group
  get customFormGroupsDict(): Record<string, CustomFormGroup> {
      return this.controlsDict.ofKeys<CustomFormGroup>(this.controlsDict.keys.filter(x => this.controls[x] instanceof CustomFormGroup));
  }

  get customFormGroups(): CustomFormGroup[] {
      return this.controlsDict.values.filter(x => x instanceof CustomFormGroup).map(x => x as CustomFormGroup);
  }

  override get invalid(): boolean {
      return this.controlsDict.values.some(x => x.invalid);
  }

  public _addControl<T extends CustomFormElementType>(name: string, control: T, disabled = false): void {
      (control as T & { __fg?: CustomFormElementType})['__fg'] = this;
      if (disabled)
          control.disable();
      super.addControl(name, control);
  }
}
