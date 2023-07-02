import { CalculatorState } from "./calculator-state"

export class CalculatorRequestMT{
    buttonClicked : string = "";
    state : CalculatorState|null = null;
}
export class CalculatorRequestST{
    buttonClicked : string= "";
}