/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RodosCupManagerTestModule } from '../../../test.module';
import { LegDeleteDialogComponent } from 'app/entities/leg/leg-delete-dialog.component';
import { LegService } from 'app/entities/leg/leg.service';

describe('Component Tests', () => {
    describe('Leg Management Delete Component', () => {
        let comp: LegDeleteDialogComponent;
        let fixture: ComponentFixture<LegDeleteDialogComponent>;
        let service: LegService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [LegDeleteDialogComponent]
            })
                .overrideTemplate(LegDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LegDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LegService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
