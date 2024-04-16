export interface Alert {
    message: string;
    type?: string; // Optional type (e.g., 'danger', 'warning')
    expiry?: number; // Optional expiry time in milliseconds
}
