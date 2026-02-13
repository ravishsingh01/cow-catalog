import { Pipe, PipeTransform } from '@angular/core';
import { humanize } from '../utils/string-format.util';

@Pipe({
  name: 'humanize',
})
export class HumanizePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return humanize(value);
  }
}
