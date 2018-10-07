/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { RodosCupManagerTestModule } from '../../../test.module';
import { ChampionshipUpdateComponent } from 'app/entities/championship/championship-update.component';
import { ChampionshipService } from 'app/entities/championship/championship.service';
import { Championship } from 'app/shared/model/championship.model';

describe('Component Tests', () => {
    describe('Championship Management Update Component', () => {
        let comp: ChampionshipUpdateComponent;
        let fixture: ComponentFixture<ChampionshipUpdateComponent>;
        let service: ChampionshipService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [ChampionshipUpdateComponent]
            })
                .overrideTemplate(ChampionshipUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChampionshipUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChampionshipService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Championship(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.championship = entity;
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
                    const entity = new Championship();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.championship = entity;
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
