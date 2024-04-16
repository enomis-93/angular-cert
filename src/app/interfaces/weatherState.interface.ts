import { ConditionsAndZip } from './conditionsAndZip.interface';

export interface WeatherState {
    currentConditions: ConditionsAndZip[] | null;
    error: string | null;
}
