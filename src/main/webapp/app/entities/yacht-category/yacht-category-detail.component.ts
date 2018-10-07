import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IYachtCategory } from 'app/shared/model/yacht-category.model';

@Component({
    selector: 'jhi-yacht-category-detail',
    templateUrl: './yacht-category-detail.component.html'
})
export class YachtCategoryDetailComponent implements OnInit {
    yachtCategory: IYachtCategory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ yachtCategory }) => {
            this.yachtCategory = yachtCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
