import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRaceResult } from 'app/shared/model/race-result.model';
import { RaceResultService } from './race-result.service';

@Component({
    selector: 'jhi-race-result-delete-dialog',
    templateUrl: './race-result-delete-dialog.component.html'
})
export class RaceResultDeleteDialogComponent {
    raceResult: IRaceResult;

    constructor(private raceResultService: RaceResultService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.raceResultService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'raceResultListModification',
                content: 'Deleted an raceResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-race-result-delete-popup',
    template: ''
})
export class RaceResultDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ raceResult }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RaceResultDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.raceResult = raceResult;
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
