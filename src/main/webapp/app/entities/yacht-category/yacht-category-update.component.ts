import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IYachtCategory } from 'app/shared/model/yacht-category.model';
import { YachtCategoryService } from './yacht-category.service';
import { IChampionship } from 'app/shared/model/championship.model';
import { ChampionshipService } from 'app/entities/championship';
import { IRaceResult } from 'app/shared/model/race-result.model';
import { RaceResultService } from 'app/entities/race-result';

@Component({
    selector: 'jhi-yacht-category-update',
    templateUrl: './yacht-category-update.component.html'
})
export class YachtCategoryUpdateComponent implements OnInit {
    private _yachtCategory: IYachtCategory;
    isSaving: boolean;

    championships: IChampionship[];

    raceresults: IRaceResult[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private yachtCategoryService: YachtCategoryService,
        private championshipService: ChampionshipService,
        private raceResultService: RaceResultService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ yachtCategory }) => {
            this.yachtCategory = yachtCategory;
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
        if (this.yachtCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.yachtCategoryService.update(this.yachtCategory));
        } else {
            this.subscribeToSaveResponse(this.yachtCategoryService.create(this.yachtCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IYachtCategory>>) {
        result.subscribe((res: HttpResponse<IYachtCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get yachtCategory() {
        return this._yachtCategory;
    }

    set yachtCategory(yachtCategory: IYachtCategory) {
        this._yachtCategory = yachtCategory;
    }
}
