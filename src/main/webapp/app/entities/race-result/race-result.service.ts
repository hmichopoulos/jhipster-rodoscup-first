import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRaceResult } from 'app/shared/model/race-result.model';

type EntityResponseType = HttpResponse<IRaceResult>;
type EntityArrayResponseType = HttpResponse<IRaceResult[]>;

@Injectable({ providedIn: 'root' })
export class RaceResultService {
    private resourceUrl = SERVER_API_URL + 'api/race-results';

    constructor(private http: HttpClient) {}

    create(raceResult: IRaceResult): Observable<EntityResponseType> {
        return this.http.post<IRaceResult>(this.resourceUrl, raceResult, { observe: 'response' });
    }

    update(raceResult: IRaceResult): Observable<EntityResponseType> {
        return this.http.put<IRaceResult>(this.resourceUrl, raceResult, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRaceResult>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRaceResult[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
