import { Moment } from 'moment';
import { IChampionship } from 'app/shared/model//championship.model';
import { IRaceResult } from 'app/shared/model//race-result.model';

export interface ILeg {
    id?: number;
    name?: string;
    day?: Moment;
    championship?: IChampionship;
    raceResult?: IRaceResult;
}

export class Leg implements ILeg {
    constructor(
        public id?: number,
        public name?: string,
        public day?: Moment,
        public championship?: IChampionship,
        public raceResult?: IRaceResult
    ) {}
}
