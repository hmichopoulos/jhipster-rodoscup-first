/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RodosCupManagerTestModule } from '../../../test.module';
import { YachtCategoryComponent } from 'app/entities/yacht-category/yacht-category.component';
import { YachtCategoryService } from 'app/entities/yacht-category/yacht-category.service';
import { YachtCategory } from 'app/shared/model/yacht-category.model';

describe('Component Tests', () => {
    describe('YachtCategory Management Component', () => {
        let comp: YachtCategoryComponent;
        let fixture: ComponentFixture<YachtCategoryComponent>;
        let service: YachtCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [YachtCategoryComponent],
                providers: []
            })
                .overrideTemplate(YachtCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(YachtCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YachtCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new YachtCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.yachtCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
