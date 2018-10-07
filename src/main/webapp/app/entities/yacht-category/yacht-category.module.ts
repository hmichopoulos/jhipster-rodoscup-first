import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RodosCupManagerSharedModule } from 'app/shared';
import {
    YachtCategoryComponent,
    YachtCategoryDetailComponent,
    YachtCategoryUpdateComponent,
    YachtCategoryDeletePopupComponent,
    YachtCategoryDeleteDialogComponent,
    yachtCategoryRoute,
    yachtCategoryPopupRoute
} from './';

const ENTITY_STATES = [...yachtCategoryRoute, ...yachtCategoryPopupRoute];

@NgModule({
    imports: [RodosCupManagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        YachtCategoryComponent,
        YachtCategoryDetailComponent,
        YachtCategoryUpdateComponent,
        YachtCategoryDeleteDialogComponent,
        YachtCategoryDeletePopupComponent
    ],
    entryComponents: [
        YachtCategoryComponent,
        YachtCategoryUpdateComponent,
        YachtCategoryDeleteDialogComponent,
        YachtCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RodosCupManagerYachtCategoryModule {}
