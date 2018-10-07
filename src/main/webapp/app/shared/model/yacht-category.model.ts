import { IChampionship } from 'app/shared/model//championship.model';
import { IRaceResult } from 'app/shared/model//race-result.model';

export interface IYachtCategory {
    id?: number;
    name?: string;
    championship?: IChampionship;
    raceResult?: IRaceResult;
}

export class YachtCategory implements IYachtCategory {
    constructor(public id?: number, public name?: string, public championship?: IChampionship, public raceResult?: IRaceResult) {}
}
