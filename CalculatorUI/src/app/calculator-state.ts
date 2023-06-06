export interface iCalculatorState {
    [key: string]: string | number | boolean | readonly (string | number | boolean)[];
    operation: string;
    term: string[];
}