import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILeg } from 'app/shared/model/leg.model';

@Component({
    selector: 'jhi-leg-detail',
    templateUrl: './leg-detail.component.html'
})
export class LegDetailComponent implements OnInit {
    leg: ILeg;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ leg }) => {
            this.leg = leg;
        });
    }

    previousState() {
        window.history.back();
    }
}
