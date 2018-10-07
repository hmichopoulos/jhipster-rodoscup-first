import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Leg } from 'app/shared/model/leg.model';
import { LegService } from './leg.service';
import { LegComponent } from './leg.component';
import { LegDetailComponent } from './leg-detail.component';
import { LegUpdateComponent } from './leg-update.component';
import { LegDeletePopupComponent } from './leg-delete-dialog.component';
import { ILeg } from 'app/shared/model/leg.model';

@Injectable({ providedIn: 'root' })
export class LegResolve implements Resolve<ILeg> {
    constructor(private service: LegService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((leg: HttpResponse<Leg>) => leg.body));
        }
        return of(new Leg());
    }
}

export const legRoute: Routes = [
    {
        path: 'leg',
        component: LegComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Legs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'leg/:id/view',
        component: LegDetailComponent,
        resolve: {
            leg: LegResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Legs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'leg/new',
        component: LegUpdateComponent,
        resolve: {
            leg: LegResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Legs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'leg/:id/edit',
        component: LegUpdateComponent,
        resolve: {
            leg: LegResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Legs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const legPopupRoute: Routes = [
    {
        path: 'leg/:id/delete',
        component: LegDeletePopupComponent,
        resolve: {
            leg: LegResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Legs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
