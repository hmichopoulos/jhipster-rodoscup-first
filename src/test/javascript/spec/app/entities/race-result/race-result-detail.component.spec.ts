/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RodosCupManagerTestModule } from '../../../test.module';
import { RaceResultDetailComponent } from 'app/entities/race-result/race-result-detail.component';
import { RaceResult } from 'app/shared/model/race-result.model';

describe('Component Tests', () => {
    describe('RaceResult Management Detail Component', () => {
        let comp: RaceResultDetailComponent;
        let fixture: ComponentFixture<RaceResultDetailComponent>;
        const route = ({ data: of({ raceResult: new RaceResult(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [RaceResultDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RaceResultDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RaceResultDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.raceResult).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
