/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RodosCupManagerTestModule } from '../../../test.module';
import { ChampionshipDeleteDialogComponent } from 'app/entities/championship/championship-delete-dialog.component';
import { ChampionshipService } from 'app/entities/championship/championship.service';

describe('Component Tests', () => {
    describe('Championship Management Delete Component', () => {
        let comp: ChampionshipDeleteDialogComponent;
        let fixture: ComponentFixture<ChampionshipDeleteDialogComponent>;
        let service: ChampionshipService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [ChampionshipDeleteDialogComponent]
            })
                .overrideTemplate(ChampionshipDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChampionshipDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChampionshipService);
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
