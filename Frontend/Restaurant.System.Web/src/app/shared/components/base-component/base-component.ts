import { Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { SubscriptionBase } from '../../../core/entities/subscription-base';
import { BaseDto } from '../../models/dtos/base/base.dto';

@Directive()
export abstract class BaseComponent<TRequest extends BaseDto> extends SubscriptionBase implements OnDestroy {
  form!: FormGroup;
  response$: Subject<TRequest> = new Subject<TRequest>();

  abstract get request(): TRequest;
  abstract set request(value: TRequest);

  protected abstract submit(req: TRequest): void;

  onSubmit(): void {
    if(!this.form) return;

    if(this.onValidateForm()) {
      const req = this.getFormRequest() as TRequest;
      this.submit(req);
    } else {
      this.markAllAsTouched();
    }
  }

  protected abstract onValidateForm(): boolean;
  protected abstract getFormRequest(): BaseDto;

  private markAllAsTouched() {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  ngOnDestroy(): void {
    this.destroySubs();
  }
}
