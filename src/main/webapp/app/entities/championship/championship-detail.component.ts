import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChampionship } from 'app/shared/model/championship.model';

@Component({
    selector: 'jhi-championship-detail',
    templateUrl: './championship-detail.component.html'
})
export class ChampionshipDetailComponent implements OnInit {
    championship: IChampionship;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ championship }) => {
            this.championship = championship;
        });
    }

    previousState() {
        window.history.back();
    }
}
