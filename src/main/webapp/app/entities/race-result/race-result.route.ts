import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RaceResult } from 'app/shared/model/race-result.model';
import { RaceResultService } from './race-result.service';
import { RaceResultComponent } from './race-result.component';
import { RaceResultDetailComponent } from './race-result-detail.component';
import { RaceResultUpdateComponent } from './race-result-update.component';
import { RaceResultDeletePopupComponent } from './race-result-delete-dialog.component';
import { IRaceResult } from 'app/shared/model/race-result.model';

@Injectable({ providedIn: 'root' })
export class RaceResultResolve implements Resolve<IRaceResult> {
    constructor(private service: RaceResultService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((raceResult: HttpResponse<RaceResult>) => raceResult.body));
        }
        return of(new RaceResult());
    }
}

export const raceResultRoute: Routes = [
    {
        path: 'race-result',
        component: RaceResultComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RaceResults'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'race-result/:id/view',
        component: RaceResultDetailComponent,
        resolve: {
            raceResult: RaceResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RaceResults'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'race-result/new',
        component: RaceResultUpdateComponent,
        resolve: {
            raceResult: RaceResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RaceResults'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'race-result/:id/edit',
        component: RaceResultUpdateComponent,
        resolve: {
            raceResult: RaceResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RaceResults'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const raceResultPopupRoute: Routes = [
    {
        path: 'race-result/:id/delete',
        component: RaceResultDeletePopupComponent,
        resolve: {
            raceResult: RaceResultResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RaceResults'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
