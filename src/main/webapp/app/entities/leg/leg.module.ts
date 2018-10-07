import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RodosCupManagerSharedModule } from 'app/shared';
import {
    LegComponent,
    LegDetailComponent,
    LegUpdateComponent,
    LegDeletePopupComponent,
    LegDeleteDialogComponent,
    legRoute,
    legPopupRoute
} from './';

const ENTITY_STATES = [...legRoute, ...legPopupRoute];

@NgModule({
    imports: [RodosCupManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LegComponent, LegDetailComponent, LegUpdateComponent, LegDeleteDialogComponent, LegDeletePopupComponent],
    entryComponents: [LegComponent, LegUpdateComponent, LegDeleteDialogComponent, LegDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RodosCupManagerLegModule {}
