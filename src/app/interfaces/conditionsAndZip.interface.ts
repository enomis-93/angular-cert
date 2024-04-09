import { CurrentConditions } from './current-conditions.type';

export interface ConditionsAndZip {
    zipcode: string;
    data: CurrentConditions;
}
