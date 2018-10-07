import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { YachtCategory } from 'app/shared/model/yacht-category.model';
import { YachtCategoryService } from './yacht-category.service';
import { YachtCategoryComponent } from './yacht-category.component';
import { YachtCategoryDetailComponent } from './yacht-category-detail.component';
import { YachtCategoryUpdateComponent } from './yacht-category-update.component';
import { YachtCategoryDeletePopupComponent } from './yacht-category-delete-dialog.component';
import { IYachtCategory } from 'app/shared/model/yacht-category.model';

@Injectable({ providedIn: 'root' })
export class YachtCategoryResolve implements Resolve<IYachtCategory> {
    constructor(private service: YachtCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((yachtCategory: HttpResponse<YachtCategory>) => yachtCategory.body));
        }
        return of(new YachtCategory());
    }
}

export const yachtCategoryRoute: Routes = [
    {
        path: 'yacht-category',
        component: YachtCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YachtCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'yacht-category/:id/view',
        component: YachtCategoryDetailComponent,
        resolve: {
            yachtCategory: YachtCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YachtCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'yacht-category/new',
        component: YachtCategoryUpdateComponent,
        resolve: {
            yachtCategory: YachtCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YachtCategories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'yacht-category/:id/edit',
        component: YachtCategoryUpdateComponent,
        resolve: {
            yachtCategory: YachtCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YachtCategories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const yachtCategoryPopupRoute: Routes = [
    {
        path: 'yacht-category/:id/delete',
        component: YachtCategoryDeletePopupComponent,
        resolve: {
            yachtCategory: YachtCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'YachtCategories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
