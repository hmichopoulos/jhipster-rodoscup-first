/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { RodosCupManagerTestModule } from '../../../test.module';
import { YachtCategoryUpdateComponent } from 'app/entities/yacht-category/yacht-category-update.component';
import { YachtCategoryService } from 'app/entities/yacht-category/yacht-category.service';
import { YachtCategory } from 'app/shared/model/yacht-category.model';

describe('Component Tests', () => {
    describe('YachtCategory Management Update Component', () => {
        let comp: YachtCategoryUpdateComponent;
        let fixture: ComponentFixture<YachtCategoryUpdateComponent>;
        let service: YachtCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RodosCupManagerTestModule],
                declarations: [YachtCategoryUpdateComponent]
            })
                .overrideTemplate(YachtCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(YachtCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YachtCategoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new YachtCategory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.yachtCategory = entity;
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
                    const entity = new YachtCategory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.yachtCategory = entity;
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
