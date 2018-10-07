/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { RodosCupManagerTestModule } from '../../../test.module';
import { LegUpdateComponent } from 'app/entities/leg/leg-update.component';
import { LegService } from 'app/entities/leg/leg.service';
import { Leg } from 'app/shared/model/leg.model';

describe('Component Tests', () => {
    describe('Leg Management Update Component', () => {
        let comp: LegUpdateComponent;
        let fixture: ComponentFixture<LegUpdateComponent>;
        let service: LegService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [LegUpdateComponent]
            })
                .overrideTemplate(LegUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LegUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LegService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Leg(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.leg = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Leg();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.leg = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
