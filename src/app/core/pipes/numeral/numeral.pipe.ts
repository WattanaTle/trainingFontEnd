import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeral',
})
export class NumeralPipe implements PipeTransform {
 
  transform(number: any, format: string): string {
    let inputNumeral = require('numeral');

    let returnNumeral: string;

    if (format != "") {
      returnNumeral = inputNumeral.format(format);
    } else {
      returnNumeral = number;
    }

    return returnNumeral;
  }

}
