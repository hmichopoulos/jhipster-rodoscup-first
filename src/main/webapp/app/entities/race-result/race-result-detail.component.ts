import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRaceResult } from 'app/shared/model/race-result.model';

@Component({
    selector: 'jhi-race-result-detail',
    templateUrl: './race-result-detail.component.html'
})
export class RaceResultDetailComponent implements OnInit {
    raceResult: IRaceResult;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ raceResult }) => {
            this.raceResult = raceResult;
        });
    }

    previousState() {
        window.history.back();
    }
}
