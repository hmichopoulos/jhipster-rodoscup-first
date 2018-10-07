import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ILeg } from 'app/shared/model/leg.model';
import { LegService } from './leg.service';
import { IChampionship } from 'app/shared/model/championship.model';
import { ChampionshipService } from 'app/entities/championship';
import { IRaceResult } from 'app/shared/model/race-result.model';
import { RaceResultService } from 'app/entities/race-result';

@Component({
    selector: 'jhi-leg-update',
    templateUrl: './leg-update.component.html'
})
export class LegUpdateComponent implements OnInit {
    private _leg: ILeg;
    isSaving: boolean;

    championships: IChampionship[];

    raceresults: IRaceResult[];
    day: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private legService: LegService,
        private championshipService: ChampionshipService,
        private raceResultService: RaceResultService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ leg }) => {
            this.leg = leg;
        });
        this.championshipService.query().subscribe(
            (res: HttpResponse<IChampionship[]>) => {
                this.championships = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.raceResultService.query().subscribe(
            (res: HttpResponse<IRaceResult[]>) => {
                this.raceresults = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.leg.day = moment(this.day, DATE_TIME_FORMAT);
        if (this.leg.id !== undefined) {
            this.subscribeToSaveResponse(this.legService.update(this.leg));
        } else {
            this.subscribeToSaveResponse(this.legService.create(this.leg));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILeg>>) {
        result.subscribe((res: HttpResponse<ILeg>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackChampionshipById(index: number, item: IChampionship) {
        return item.id;
    }

    trackRaceResultById(index: number, item: IRaceResult) {
        return item.id;
    }
    get leg() {
        return this._leg;
    }

    set leg(leg: ILeg) {
        this._leg = leg;
        this.day = moment(leg.day).format(DATE_TIME_FORMAT);
    }
}
