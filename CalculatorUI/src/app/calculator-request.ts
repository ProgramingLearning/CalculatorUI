import { iCalculatorState } from "./calculator-state"

export interface iCalculatorRequest{
    buttonClicked : string;
    state : iCalculatorState;
}
export interface iCalculatorRequestST{
    buttonClicked : string;
}