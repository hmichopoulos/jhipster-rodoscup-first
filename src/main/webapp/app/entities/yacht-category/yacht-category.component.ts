import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IYachtCategory } from 'app/shared/model/yacht-category.model';
import { Principal } from 'app/core';
import { YachtCategoryService } from './yacht-category.service';

@Component({
    selector: 'jhi-yacht-category',
    templateUrl: './yacht-category.component.html'
})
export class YachtCategoryComponent implements OnInit, OnDestroy {
    yachtCategories: IYachtCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private yachtCategoryService: YachtCategoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.yachtCategoryService.query().subscribe(
            (res: HttpResponse<IYachtCategory[]>) => {
                this.yachtCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInYachtCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IYachtCategory) {
        return item.id;
    }

    registerChangeInYachtCategories() {
        this.eventSubscriber = this.eventManager.subscribe('yachtCategoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
