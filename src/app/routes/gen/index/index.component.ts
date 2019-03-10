import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from '@core/utils/basePage';
import { type } from 'os';
import { getTypeOf } from '@angular/core/testing/src/lang_utils';
import * as _ from 'lodash';
@Component({
  selector: 'app-gen-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
})
export class GenIndexComponent extends BasePage implements OnInit ,AfterViewInit{
  currentTable:any;
  genTableList=[];
  score=12;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }
  getGenTables()
  {
    this.http.get('/gen/genTableList').subscribe((data:any)=>{
      console.log(data);
      this.genTableList=data;
    });
  }

  ngAfterViewInit(): void {
    this.getGenTables();
  }
  selectTable(table)
  {
    this.currentTable=table;
    console.log(table);
   let  cc=  this.currentTable.primaryKeyColumnList.includes('column.name');

   console.log(typeof cc,cc,!cc);

  }
  modelChange(c)
  {
    console.log(c);
  }
  transform1(value: any,columnList:string[],primaryKeyColumnList:string[],index:number): any {
    if(!primaryKeyColumnList.includes(value))
    {
      if (index<columnList.length-1)
      {
        return '#{{'+_.camelCase(value)+'}},';
      }
      else
      {
        return `#{{${_.camelCase(value)}}}`;
      }
    }
    else
    {
      return '';
    }

  }
}
