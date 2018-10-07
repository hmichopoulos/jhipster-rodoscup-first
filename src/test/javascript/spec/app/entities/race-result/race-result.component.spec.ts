/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RodosCupManagerTestModule } from '../../../test.module';
import { RaceResultComponent } from 'app/entities/race-result/race-result.component';
import { RaceResultService } from 'app/entities/race-result/race-result.service';
import { RaceResult } from 'app/shared/model/race-result.model';

describe('Component Tests', () => {
    describe('RaceResult Management Component', () => {
        let comp: RaceResultComponent;
        let fixture: ComponentFixture<RaceResultComponent>;
        let service: RaceResultService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [RaceResultComponent],
                providers: []
            })
                .overrideTemplate(RaceResultComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RaceResultComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RaceResultService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RaceResult(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.raceResults[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
