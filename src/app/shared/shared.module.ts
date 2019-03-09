import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {AgGridModule} from 'ag-grid-angular/main';
import { OperationRenderComponent } from '@shared/core-components/cell-render/operation-render/operation-render.component';
import { TextFilterComponent } from '@shared/core-components/grid-filter/text-filter/text-filter.component';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { WTableComponent } from './core-components/w-table/w-table.component';
import { WInputComponent } from './core-components/w-input/w-input.component';
import { TestPipe } from '@shared/pipe/TestPipe';
import { StringCamelCase } from '@shared/pipe/StringCamelCase';
import { StringUpperFirstPipe } from '@shared/pipe/StringUpperFirstPipe';
const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule
];
// #endregion

// #region your componets & directives
const COMPONENTS = [
  OperationRenderComponent,
  TextFilterComponent,
  WTableComponent,
  WInputComponent,
  TestPipe,
  StringCamelCase,
  StringUpperFirstPipe
];
const DIRECTIVES = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
    AgGridModule.withComponents([OperationRenderComponent,TextFilterComponent])
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    WInputComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
