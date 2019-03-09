import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { GenRoutingModule } from './gen-routing.module';
import { GenIndexComponent } from './index/index.component';
import { CoreModule } from '@core/core.module';

const COMPONENTS = [
  GenIndexComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    GenRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class GenModule { }
