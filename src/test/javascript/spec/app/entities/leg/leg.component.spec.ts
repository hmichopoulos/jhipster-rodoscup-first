/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RodosCupManagerTestModule } from '../../../test.module';
import { LegComponent } from 'app/entities/leg/leg.component';
import { LegService } from 'app/entities/leg/leg.service';
import { Leg } from 'app/shared/model/leg.model';

describe('Component Tests', () => {
    describe('Leg Management Component', () => {
        let comp: LegComponent;
        let fixture: ComponentFixture<LegComponent>;
        let service: LegService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [LegComponent],
                providers: []
            })
                .overrideTemplate(LegComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LegComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LegService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Leg(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.legs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
