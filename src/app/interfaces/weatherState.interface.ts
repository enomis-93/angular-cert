import { ConditionsAndZip } from './conditionsAndZip.interface';

export interface WeatherState {
    currentConditions: ConditionsAndZip[] | null;
    locations: string[] | null;
    error: string | null;
}
