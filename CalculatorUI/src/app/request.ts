import { iCalculatorState } from "./calculator-state";

export interface iRequest {
    [key: string]: string | number | boolean | readonly (string | number | boolean)[]|iCalculatorState;
    CALCULATORSTATE : iCalculatorState; 
    buttonPressed :string;
    }