import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILeg } from 'app/shared/model/leg.model';
import { Principal } from 'app/core';
import { LegService } from './leg.service';

@Component({
    selector: 'jhi-leg',
    templateUrl: './leg.component.html'
})
export class LegComponent implements OnInit, OnDestroy {
    legs: ILeg[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private legService: LegService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.legService.query().subscribe(
            (res: HttpResponse<ILeg[]>) => {
                this.legs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLegs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILeg) {
        return item.id;
    }

    registerChangeInLegs() {
        this.eventSubscriber = this.eventManager.subscribe('legListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
