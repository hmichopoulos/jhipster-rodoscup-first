import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRaceResult } from 'app/shared/model/race-result.model';
import { Principal } from 'app/core';
import { RaceResultService } from './race-result.service';

@Component({
    selector: 'jhi-race-result',
    templateUrl: './race-result.component.html'
})
export class RaceResultComponent implements OnInit, OnDestroy {
    raceResults: IRaceResult[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private raceResultService: RaceResultService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.raceResultService.query().subscribe(
            (res: HttpResponse<IRaceResult[]>) => {
                this.raceResults = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRaceResults();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRaceResult) {
        return item.id;
    }

    registerChangeInRaceResults() {
        this.eventSubscriber = this.eventManager.subscribe('raceResultListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
