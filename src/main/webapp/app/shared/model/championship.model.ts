import { ILeg } from 'app/shared/model//leg.model';
import { IYachtCategory } from 'app/shared/model//yacht-category.model';

export interface IChampionship {
    id?: number;
    year?: number;
    legs?: ILeg[];
    yachtCategories?: IYachtCategory[];
}

export class Championship implements IChampionship {
    constructor(public id?: number, public year?: number, public legs?: ILeg[], public yachtCategories?: IYachtCategory[]) {}
}
