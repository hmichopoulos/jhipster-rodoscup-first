import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChampionship } from 'app/shared/model/championship.model';
import { Principal } from 'app/core';
import { ChampionshipService } from './championship.service';

@Component({
    selector: 'jhi-championship',
    templateUrl: './championship.component.html'
})
export class ChampionshipComponent implements OnInit, OnDestroy {
    championships: IChampionship[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private championshipService: ChampionshipService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.championshipService.query().subscribe(
            (res: HttpResponse<IChampionship[]>) => {
                this.championships = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInChampionships();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IChampionship) {
        return item.id;
    }

    registerChangeInChampionships() {
        this.eventSubscriber = this.eventManager.subscribe('championshipListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
