import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorConverter'
})
export class ErrorConverterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
