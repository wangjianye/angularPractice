import { Pipe, PipeTransform } from '@angular/core';
import { StringCamelCase } from '@shared/pipe/StringCamelCase';
import { StringUpperFirstPipe } from '@shared/pipe/StringUpperFirstPipe';
import * as _ from 'lodash';
@Pipe({
  name:'insertSqlValuePart'
})
export  class InsertSqlValuePartPipe implements PipeTransform {


  transform(value: any,primaryKeyColumnList:string[],index:number): any {
    if (!primaryKeyColumnList.includes(value) && primaryKeyColumnList.length-1>index)
    {
     // #{{'{'}}{{'{'}}{{column.name|stringCamelCase}}{{'}'}}{{'}'}} ,
      return `#{{${_.camelCase(value)}}}`;
    }
    return value;
  }
}
