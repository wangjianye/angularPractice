import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { TestPipe } from '@core/../shared/pipe/TestPipe';


@NgModule({
  providers: [
  ],
  declarations:[

  ],
  exports:[

  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
