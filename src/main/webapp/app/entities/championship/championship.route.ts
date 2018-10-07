import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Championship } from 'app/shared/model/championship.model';
import { ChampionshipService } from './championship.service';
import { ChampionshipComponent } from './championship.component';
import { ChampionshipDetailComponent } from './championship-detail.component';
import { ChampionshipUpdateComponent } from './championship-update.component';
import { ChampionshipDeletePopupComponent } from './championship-delete-dialog.component';
import { IChampionship } from 'app/shared/model/championship.model';

@Injectable({ providedIn: 'root' })
export class ChampionshipResolve implements Resolve<IChampionship> {
    constructor(private service: ChampionshipService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((championship: HttpResponse<Championship>) => championship.body));
        }
        return of(new Championship());
    }
}

export const championshipRoute: Routes = [
    {
        path: 'championship',
        component: ChampionshipComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Championships'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'championship/:id/view',
        component: ChampionshipDetailComponent,
        resolve: {
            championship: ChampionshipResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Championships'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'championship/new',
        component: ChampionshipUpdateComponent,
        resolve: {
            championship: ChampionshipResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Championships'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'championship/:id/edit',
        component: ChampionshipUpdateComponent,
        resolve: {
            championship: ChampionshipResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Championships'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const championshipPopupRoute: Routes = [
    {
        path: 'championship/:id/delete',
        component: ChampionshipDeletePopupComponent,
        resolve: {
            championship: ChampionshipResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Championships'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
