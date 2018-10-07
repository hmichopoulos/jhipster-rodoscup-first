/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RodosCupManagerTestModule } from '../../../test.module';
import { YachtCategoryDeleteDialogComponent } from 'app/entities/yacht-category/yacht-category-delete-dialog.component';
import { YachtCategoryService } from 'app/entities/yacht-category/yacht-category.service';

describe('Component Tests', () => {
    describe('YachtCategory Management Delete Component', () => {
        let comp: YachtCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<YachtCategoryDeleteDialogComponent>;
        let service: YachtCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [YachtCategoryDeleteDialogComponent]
            })
                .overrideTemplate(YachtCategoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(YachtCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YachtCategoryService);
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
