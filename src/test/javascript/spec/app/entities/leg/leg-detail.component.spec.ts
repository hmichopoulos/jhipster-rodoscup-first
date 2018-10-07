/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RodosCupManagerTestModule } from '../../../test.module';
import { LegDetailComponent } from 'app/entities/leg/leg-detail.component';
import { Leg } from 'app/shared/model/leg.model';

describe('Component Tests', () => {
    describe('Leg Management Detail Component', () => {
        let comp: LegDetailComponent;
        let fixture: ComponentFixture<LegDetailComponent>;
        const route = ({ data: of({ leg: new Leg(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [LegDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LegDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LegDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.leg).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
