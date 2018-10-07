import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRaceResult } from 'app/shared/model/race-result.model';
import { RaceResultService } from './race-result.service';

@Component({
    selector: 'jhi-race-result-update',
    templateUrl: './race-result-update.component.html'
})
export class RaceResultUpdateComponent implements OnInit {
    private _raceResult: IRaceResult;
    isSaving: boolean;

    constructor(private raceResultService: RaceResultService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ raceResult }) => {
            this.raceResult = raceResult;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.raceResult.id !== undefined) {
            this.subscribeToSaveResponse(this.raceResultService.update(this.raceResult));
        } else {
            this.subscribeToSaveResponse(this.raceResultService.create(this.raceResult));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRaceResult>>) {
        result.subscribe((res: HttpResponse<IRaceResult>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get raceResult() {
        return this._raceResult;
    }

    set raceResult(raceResult: IRaceResult) {
        this._raceResult = raceResult;
    }
}
