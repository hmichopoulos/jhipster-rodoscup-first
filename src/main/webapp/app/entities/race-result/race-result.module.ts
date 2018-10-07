import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RodosCupManagerSharedModule } from 'app/shared';
import {
    RaceResultComponent,
    RaceResultDetailComponent,
    RaceResultUpdateComponent,
    RaceResultDeletePopupComponent,
    RaceResultDeleteDialogComponent,
    raceResultRoute,
    raceResultPopupRoute
} from './';

const ENTITY_STATES = [...raceResultRoute, ...raceResultPopupRoute];

@NgModule({
    imports: [RodosCupManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RaceResultComponent,
        RaceResultDetailComponent,
        RaceResultUpdateComponent,
        RaceResultDeleteDialogComponent,
        RaceResultDeletePopupComponent
    ],
    entryComponents: [RaceResultComponent, RaceResultUpdateComponent, RaceResultDeleteDialogComponent, RaceResultDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RodosCupManagerRaceResultModule {}
