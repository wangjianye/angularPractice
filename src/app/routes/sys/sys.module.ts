import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SysRoutingModule } from './sys-routing.module';
import { SysUserComponent } from './user/user.component';
import {AgGridModule} from 'ag-grid-angular/main';
import { OperationRenderComponent } from '@shared/cell-render/operation-render/operation-render.component';
import { TextFilterComponent } from '@shared/grid-filter/text-filter/text-filter.component';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { MomentModule } from 'ngx-moment';
const COMPONENTS = [
  SysUserComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SysRoutingModule,
    MomentModule,
    AgGridModule.withComponents([OperationRenderComponent,TextFilterComponent]),
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT,
  providers:[
    { provide: NZ_I18N, useValue: zh_CN  },
  ]
})
export class SysModule { }