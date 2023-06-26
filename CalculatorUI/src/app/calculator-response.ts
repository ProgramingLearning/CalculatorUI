import { iCalculatorState } from "./calculator-state";
import { iCalculatorResultMT,iCalculatorResultST } from "./result";

export interface iCalculatorResponseMT{
    calculatorState: iCalculatorState
    calculatorResult: iCalculatorResultMT;
}

export interface iCalculatorResponseST{
    calculatorResult: iCalculatorResultST;
}