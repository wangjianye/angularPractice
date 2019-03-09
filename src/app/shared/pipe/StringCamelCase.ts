import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name:'stringCamelCase'
})
export  class StringCamelCase implements   PipeTransform{
  transform(value: any, ...args: any[]): any {
    return _.camelCase(value);
  }

}
