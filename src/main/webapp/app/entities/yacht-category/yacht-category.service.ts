import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IYachtCategory } from 'app/shared/model/yacht-category.model';

type EntityResponseType = HttpResponse<IYachtCategory>;
type EntityArrayResponseType = HttpResponse<IYachtCategory[]>;

@Injectable({ providedIn: 'root' })
export class YachtCategoryService {
    private resourceUrl = SERVER_API_URL + 'api/yacht-categories';

    constructor(private http: HttpClient) {}

    create(yachtCategory: IYachtCategory): Observable<EntityResponseType> {
        return this.http.post<IYachtCategory>(this.resourceUrl, yachtCategory, { observe: 'response' });
    }

    update(yachtCategory: IYachtCategory): Observable<EntityResponseType> {
        return this.http.put<IYachtCategory>(this.resourceUrl, yachtCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IYachtCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IYachtCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
