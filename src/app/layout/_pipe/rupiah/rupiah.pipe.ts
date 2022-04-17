import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah'
})
export class RupiahPipe implements PipeTransform {

  public transform(value: number): string {
    value = value && value > 0 ? value : 0;

    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
