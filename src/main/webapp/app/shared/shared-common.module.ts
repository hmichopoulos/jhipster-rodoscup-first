import { NgModule } from '@angular/core';

import { RodosCupManagerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [RodosCupManagerSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [RodosCupManagerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class RodosCupManagerSharedCommonModule {}
