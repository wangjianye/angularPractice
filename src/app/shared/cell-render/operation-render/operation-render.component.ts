import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams, ICellRendererParams } from '../../../../../node_modules/ag-grid-community';
import * as _ from 'lodash';

@Component({
  selector: 'app-operation-render',
  templateUrl: './operation-render.component.html',
  styles: [],
})
export class OperationRenderComponent implements ICellRendererAngularComp {
  public params: any;
  public buttons: any;
  public buttonsSlice2: any;
  public buttonsAfter2: any;

  constructor() {
  }

  ngOnInit() {

  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  public invokeParentMethod(item, e) {
    e.stopPropagation();
    if (item.handle && typeof item.handle == 'function') {
      //选中行
      this.params.api.selectIndex(this.params.rowIndex, false, false);
      //执行handle方法
      item.handle.call(this.params.context.componentParent, this.params.data, this.params);

    }

  }

  agInit(params: any): void {
    if (params.colDef.buttons) {
      this.buttons = params.colDef.buttons;
      this.buttonsSlice2 = _.slice(this.buttons, 0, 2);
      this.buttonsAfter2 = _.slice(this.buttons, 2, this.buttons.length);
    }
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

}
