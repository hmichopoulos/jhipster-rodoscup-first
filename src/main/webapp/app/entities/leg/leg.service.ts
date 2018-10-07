import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILeg } from 'app/shared/model/leg.model';

type EntityResponseType = HttpResponse<ILeg>;
type EntityArrayResponseType = HttpResponse<ILeg[]>;

@Injectable({ providedIn: 'root' })
export class LegService {
    private resourceUrl = SERVER_API_URL + 'api/legs';

    constructor(private http: HttpClient) {}

    create(leg: ILeg): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(leg);
        return this.http
            .post<ILeg>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(leg: ILeg): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(leg);
        return this.http
            .put<ILeg>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILeg>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILeg[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(leg: ILeg): ILeg {
        const copy: ILeg = Object.assign({}, leg, {
            day: leg.day != null && leg.day.isValid() ? leg.day.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.day = res.body.day != null ? moment(res.body.day) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((leg: ILeg) => {
            leg.day = leg.day != null ? moment(leg.day) : null;
        });
        return res;
    }
}
