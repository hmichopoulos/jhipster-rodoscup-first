/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RodosCupManagerTestModule } from '../../../test.module';
import { YachtCategoryDetailComponent } from 'app/entities/yacht-category/yacht-category-detail.component';
import { YachtCategory } from 'app/shared/model/yacht-category.model';

describe('Component Tests', () => {
    describe('YachtCategory Management Detail Component', () => {
        let comp: YachtCategoryDetailComponent;
        let fixture: ComponentFixture<YachtCategoryDetailComponent>;
        const route = ({ data: of({ yachtCategory: new YachtCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [YachtCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(YachtCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(YachtCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.yachtCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
