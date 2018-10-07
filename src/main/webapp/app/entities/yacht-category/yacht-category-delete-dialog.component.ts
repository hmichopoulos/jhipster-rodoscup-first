import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IYachtCategory } from 'app/shared/model/yacht-category.model';
import { YachtCategoryService } from './yacht-category.service';

@Component({
    selector: 'jhi-yacht-category-delete-dialog',
    templateUrl: './yacht-category-delete-dialog.component.html'
})
export class YachtCategoryDeleteDialogComponent {
    yachtCategory: IYachtCategory;

    constructor(
        private yachtCategoryService: YachtCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.yachtCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'yachtCategoryListModification',
                content: 'Deleted an yachtCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-yacht-category-delete-popup',
    template: ''
})
export class YachtCategoryDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ yachtCategory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(YachtCategoryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.yachtCategory = yachtCategory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
