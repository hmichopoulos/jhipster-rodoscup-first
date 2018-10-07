/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RodosCupManagerTestModule } from '../../../test.module';
import { ChampionshipDetailComponent } from 'app/entities/championship/championship-detail.component';
import { Championship } from 'app/shared/model/championship.model';

describe('Component Tests', () => {
    describe('Championship Management Detail Component', () => {
        let comp: ChampionshipDetailComponent;
        let fixture: ComponentFixture<ChampionshipDetailComponent>;
        const route = ({ data: of({ championship: new Championship(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [ChampionshipDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ChampionshipDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChampionshipDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.championship).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
