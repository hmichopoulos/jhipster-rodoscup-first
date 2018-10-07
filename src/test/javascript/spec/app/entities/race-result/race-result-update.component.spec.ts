/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { RodosCupManagerTestModule } from '../../../test.module';
import { RaceResultUpdateComponent } from 'app/entities/race-result/race-result-update.component';
import { RaceResultService } from 'app/entities/race-result/race-result.service';
import { RaceResult } from 'app/shared/model/race-result.model';

describe('Component Tests', () => {
    describe('RaceResult Management Update Component', () => {
        let comp: RaceResultUpdateComponent;
        let fixture: ComponentFixture<RaceResultUpdateComponent>;
        let service: RaceResultService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [RaceResultUpdateComponent]
            })
                .overrideTemplate(RaceResultUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RaceResultUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RaceResultService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RaceResult(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.raceResult = entity;
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
                    const entity = new RaceResult();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.raceResult = entity;
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
