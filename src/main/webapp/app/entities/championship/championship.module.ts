import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RodosCupManagerSharedModule } from 'app/shared';
import {
    ChampionshipComponent,
    ChampionshipDetailComponent,
    ChampionshipUpdateComponent,
    ChampionshipDeletePopupComponent,
    ChampionshipDeleteDialogComponent,
    championshipRoute,
    championshipPopupRoute
} from './';

const ENTITY_STATES = [...championshipRoute, ...championshipPopupRoute];

@NgModule({
    imports: [RodosCupManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ChampionshipComponent,
        ChampionshipDetailComponent,
        ChampionshipUpdateComponent,
        ChampionshipDeleteDialogComponent,
        ChampionshipDeletePopupComponent
    ],
    entryComponents: [
        ChampionshipComponent,
        ChampionshipUpdateComponent,
        ChampionshipDeleteDialogComponent,
        ChampionshipDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RodosCupManagerChampionshipModule {}
