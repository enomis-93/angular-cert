// Function to validate US zip codes
export const isValidUSZipCode = (zipcode: string): boolean => {
    return /^\d{5}(-\d{4})?$/.test(zipcode);
};
