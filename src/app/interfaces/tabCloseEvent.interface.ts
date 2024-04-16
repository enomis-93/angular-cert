export interface TabCloseEvent<T> {
    index: number;
    previousIndex?: number;
    data?: T;
}
