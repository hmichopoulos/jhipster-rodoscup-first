import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        return this.http.post<ILeg>(this.resourceUrl, leg, { observe: 'response' });
    }

    update(leg: ILeg): Observable<EntityResponseType> {
        return this.http.put<ILeg>(this.resourceUrl, leg, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILeg>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILeg[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
