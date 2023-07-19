export function validate(input: ValidatableObject): boolean {
    let isValid: boolean = true;
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0;
    }
    if (input.minLength != null && typeof input.value === "string") {
        isValid = isValid && input.value.length >= input.minLength;
    }
    if (input.maxLength != null && typeof input.value === "string") {
        isValid = isValid && input.value.length <= input.maxLength;
    }
    if (input.min != null && typeof input.value === "number") {
        isValid = isValid && input.value >= input.min;
    }
    if (input.max != null && typeof input.value === "number") {
        isValid = isValid && input.value <= input.max;
    }
    return isValid;
}

// validation mechanism
export interface ValidatableObject {
    value: string | number;
    required?: boolean | undefined;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
