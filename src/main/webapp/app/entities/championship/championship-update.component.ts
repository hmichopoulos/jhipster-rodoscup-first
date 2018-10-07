import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IChampionship } from 'app/shared/model/championship.model';
import { ChampionshipService } from './championship.service';

@Component({
    selector: 'jhi-championship-update',
    templateUrl: './championship-update.component.html'
})
export class ChampionshipUpdateComponent implements OnInit {
    private _championship: IChampionship;
    isSaving: boolean;

    constructor(private championshipService: ChampionshipService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ championship }) => {
            this.championship = championship;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.championship.id !== undefined) {
            this.subscribeToSaveResponse(this.championshipService.update(this.championship));
        } else {
            this.subscribeToSaveResponse(this.championshipService.create(this.championship));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IChampionship>>) {
        result.subscribe((res: HttpResponse<IChampionship>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get championship() {
        return this._championship;
    }

    set championship(championship: IChampionship) {
        this._championship = championship;
    }
}
