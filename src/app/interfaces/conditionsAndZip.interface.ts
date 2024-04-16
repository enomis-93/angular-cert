import { CurrentConditions } from './currentConditions.interface';

export interface ConditionsAndZip {
    zipcode: string;
    data: CurrentConditions;
}
