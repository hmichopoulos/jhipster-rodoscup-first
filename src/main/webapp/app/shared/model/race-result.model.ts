import { ILeg } from 'app/shared/model//leg.model';
import { IYachtCategory } from 'app/shared/model//yacht-category.model';

export interface IRaceResult {
    id?: number;
    url?: string;
    legs?: ILeg[];
    categories?: IYachtCategory[];
}

export class RaceResult implements IRaceResult {
    constructor(public id?: number, public url?: string, public legs?: ILeg[], public categories?: IYachtCategory[]) {}
}
