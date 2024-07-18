export const isEmpty = (val: undefined | null | number | string): boolean => {
    return val !== null || val !== undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (val: any): boolean => {
    return typeof val === "number"
}