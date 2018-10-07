import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RodosCupManagerChampionshipModule } from './championship/championship.module';
import { RodosCupManagerLegModule } from './leg/leg.module';
import { RodosCupManagerYachtCategoryModule } from './yacht-category/yacht-category.module';
import { RodosCupManagerRaceResultModule } from './race-result/race-result.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        RodosCupManagerChampionshipModule,
        RodosCupManagerLegModule,
        RodosCupManagerYachtCategoryModule,
        RodosCupManagerRaceResultModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RodosCupManagerEntityModule {}
