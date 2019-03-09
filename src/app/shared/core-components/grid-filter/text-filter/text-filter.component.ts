import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { IAfterGuiAttachedParams, IDoesFilterPassParams, IFilterParams, RowNode } from 'ag-grid-community';
import { IFilterAngularComp } from '../../../../../../node_modules/ag-grid-angular/main';
import * as _ from 'lodash';
import * as moment from 'moment';

/**
 * author:王建野
 * crateTime:20181123
 */
@Component({
  selector: 'app-text-filter',
  templateUrl: './text-filter.component.html',
  styles: [],
})
export class TextFilterComponent implements IFilterAngularComp {
  private params: IFilterParams | any;
  headerName: string;
  fieldType='string'; // 字段类型
  inputType = 'input'; // 控件类型
  filterTypeEn='equals';
  select = {
    dataList: [],
    label: '',
    value: '',
  };
  filterTypeList=[
    {en:'equals',
      cn:'等于'}];
  componentParent;
  private valueGetter: (rowNode: RowNode) => any;
  text:any = '';

  constructor() {
    console.log(moment().format());
  }

  ngOnInit() {
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  agInit(params: IFilterParams | any): void {
    this.params = params;
    this.valueGetter = params.valueGetter;
    this.componentParent = this.params.context.componentParent;
    if(this.params.colDef.fieldType)
    {
      this.fieldType=this.params.colDef.fieldType;
    }
    if (this.params.colDef.filterArgs) {
      const filterArgs = this.params.colDef.filterArgs;
      if (filterArgs.filterTypeList && filterArgs.filterTypeList.length>0)
      {
        this.filterTypeList=    filterArgs.filterTypeList.map((v)=>{
          return {cn:this.getCn(v),en:v};
        });
      }
      if (filterArgs.inputType) {
        this.inputType = filterArgs.inputType;
        this.select.dataList = _.get(this.componentParent, filterArgs.select.dataList);
        this.select.label = filterArgs.select.label;
        this.select.value = filterArgs.select.value;

      }
    }
    this.headerName = this.params.colDef.headerName;
  }

  getCn(en){

    const dict={

      'equals':'等于',
      startsWith:'开头',
      contains:'包含',
      endsWith:'结尾'
    };
    return dict[en];
  }
  doesFilterPass(params: IDoesFilterPassParams): boolean {
    // make sure each word passes separately, ie search for firstname, lastname
    let passed = true;
    const valueGetter = this.valueGetter;
    this.text.toLowerCase().split(' ').forEach(function(filterWord) {
      const value = this.valueGetter(params);
      if (value.toString().toLowerCase().indexOf(filterWord) < 0) {
        passed = false;
      }
    });
    return passed;
  }

  getFrameworkComponentInstance(): any {
  }

  /**
   * 返回给外部的数据
   */
  getModel(): any {
    return {
      filterType: {
        en:this.filterTypeEn,
        cn:this.getCn(this.filterTypeEn)
      },
      value: this.text,
      fieldType: this.fieldType,
      field: this.params.colDef.field,
      headerName: this.params.colDef.headerName,
    };
  }

  getModelAsString(model: any): string {
    return '';
  }

  /**
   * 若返回true，则表头显示具有条件的图标
   */
  isFilterActive(): boolean {
    return this.text !== null && this.text !== undefined && this.text !== '';
  }

  onFloatingFilterChanged(change: any): void {
  }

  onNewRowsLoaded(): void {
  }

  setModel(model: any): void {
    console.log(model);
    this.text = model ? model.value : '';
  }


  onChange(newValue): void {
    //  通知过滤条件已经变化


    this.params.filterChangedCallback();
  }
}
