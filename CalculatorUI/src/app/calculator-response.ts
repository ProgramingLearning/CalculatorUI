import { CalculatorState } from "./calculator-state";
import { CalculatorResultMT, CalculatorResultST } from "./calculator-result";

export class CalculatorResponseMT {
    calculatorState: CalculatorState = new CalculatorState;
    calculatorResult: CalculatorResultMT = new CalculatorResultMT;
}

export class CalculatorResponseST {
    calculatorResult: CalculatorResultST = new CalculatorResultST;
}