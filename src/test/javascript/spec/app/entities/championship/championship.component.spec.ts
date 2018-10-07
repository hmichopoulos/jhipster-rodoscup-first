/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RodosCupManagerTestModule } from '../../../test.module';
import { ChampionshipComponent } from 'app/entities/championship/championship.component';
import { ChampionshipService } from 'app/entities/championship/championship.service';
import { Championship } from 'app/shared/model/championship.model';

describe('Component Tests', () => {
    describe('Championship Management Component', () => {
        let comp: ChampionshipComponent;
        let fixture: ComponentFixture<ChampionshipComponent>;
        let service: ChampionshipService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [ChampionshipComponent],
                providers: []
            })
                .overrideTemplate(ChampionshipComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChampionshipComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChampionshipService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Championship(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.championships[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
