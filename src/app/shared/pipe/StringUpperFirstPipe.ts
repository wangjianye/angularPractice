import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name:'stringUpperFirst'
})
export  class StringUpperFirstPipe implements   PipeTransform{
  transform(value: any, ...args: any[]): any {
    return _.upperFirst(value);
  }

}
