import { HostListener, Component } from '@angular/core';
import { CalculatorApiService } from '../calculator-api.service';
import { CalculatorState } from '../calculator-state';
import { CalculatorResultST, CalculatorResultMT } from '../calculator-result';
import { CalculatorResponseMT, CalculatorResponseST } from '../calculator-response';
import { CalculatorRequestMT, CalculatorRequestST } from '../calculator-request';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

export class CalculatorComponent {
  ngOnInit(): void {
    this.input = '0';
  }
  input: string = '';
  output: string = '';
  opFlag: boolean = false;
  state: CalculatorState | null = null;

  constructor(private apiService: CalculatorApiService) { }

  pressEqual() {
    this.CalculateMT("=");
  }

  pressMTOperation(op: string) {
    this.CalculateMT(op);
  }

  private CalculateMT(op: string) {
    this.opFlag = true;
    const request: CalculatorRequestMT = {
      state: this.state,
      buttonClicked: `${this.input}_${op}`
    };
    this.apiService.calculateMultipleTerm(request).subscribe(
      (response: CalculatorResponseMT) => {
        this.state = response.calculatorState;
        if (response.calculatorResult) {
          console.log(response.calculatorResult);
          this.handleResultMT(response.calculatorResult);
        }
      }
    );
  }

  pressSTOperation(op: string) {
    this.opFlag = true;
    const request: CalculatorRequestST = {
      buttonClicked: `${this.input}_${op}`
    };
    this.apiService.calculateSingleTerm(request).subscribe(
      (response: CalculatorResponseST) => {
        this.handleResultST(response.calculatorResult);
      },
    );
  }

  private handleResultMT(result: CalculatorResultMT) {
    this.output = result.message;
    this.input = result.value;
  }
  private handleResultST(result: CalculatorResultST) {
    this.output = result.message;
    this.input = result.value;
  }

  pressNum(num: string) {
    if (this.opFlag) {
      this.input = '';
      this.opFlag = false;
    }
    if (this.input.length < 15) {
      if (this.input == '0') {
        this.input = num;
      }
      else {
        this.input = this.input.concat(num);
      }
    }
  }

  pressChangeSign() {
    if (this.input.includes('-')) {
      this.input = this.input.slice(1);
    }
    else {
      if (this.input != '0') {
        this.input = '-' + this.input;
      }
    }
  }

  pressDot() {
    if (!this.input.includes(".")) {
      if (this.input === '') {
        this.input = this.input.concat('0.');
      }
      else {
        this.input = this.input.concat('.');
      }
    }
  }

  pressClearEverything() {
    this.input = '0';
    this.output = '';
    this.state = null;
  }

  pressClear() {
    this.input = '0';
  }

  @HostListener('window:keydown.0', ['$event'])
  on0KeyPress(event: KeyboardEvent) {
    this.pressNum('0');
  }
  @HostListener('window:keydown.1', ['$event'])
  on1KeyPress(event: KeyboardEvent) {
    this.pressNum('1');
  }
  @HostListener('window:keydown.2', ['$event'])
  on2KeyPress(event: KeyboardEvent) {
    this.pressNum('2');
  }
  @HostListener('window:keydown.3', ['$event'])
  on3KeyPress(event: KeyboardEvent) {
    this.pressNum('3');
  }
  @HostListener('window:keydown.4', ['$event'])
  on4KeyPress(event: KeyboardEvent) {
    this.pressNum('4');
  }
  @HostListener('window:keydown.5', ['$event'])
  on5KeyPress(event: KeyboardEvent) {
    this.pressNum('5');
  }
  @HostListener('window:keydown.6', ['$event'])
  on6KeyPress(event: KeyboardEvent) {
    this.pressNum('6');
  }
  @HostListener('window:keydown.7', ['$event'])
  on7KeyPress(event: KeyboardEvent) {
    this.pressNum('7');
  }
  @HostListener('window:keydown.8', ['$event'])
  on8KeyPress(event: KeyboardEvent) {
    this.pressNum('8');
  }
  @HostListener('window:keydown.9', ['$event'])
  on9KeyPress(event: KeyboardEvent) {
    this.pressNum('9');
  }
  @HostListener('window:keydown.+', ['$event'])
  onplusKeyPress(event: KeyboardEvent) {
    this.pressMTOperation('Sum');
  }
  @HostListener('window:keydown.-', ['$event'])
  onMinusKeyPress(event: KeyboardEvent) {
    this.pressMTOperation('Subtract');
  }
  @HostListener('window:keydown./', ['$event'])
  onDivKeyPress(event: KeyboardEvent) {
    this.pressMTOperation('Divide');
  }
  @HostListener('window:keydown.*', ['$event'])
  onMultKeyPress(event: KeyboardEvent) {
    this.pressMTOperation('Multiply');
  }
  @HostListener('window:keydown.Enter', ['$event'])
  onEnterKeyPress(event: KeyboardEvent) {
    this.pressMTOperation('=');
  }
  @HostListener('window:keydown.dot', ['$event'])
  onDotKeyPress(event: KeyboardEvent) {
    this.pressDot();
  }
  @HostListener('window:keydown.backspace', ['$event'])
  onDelKeyPress(event: KeyboardEvent) {
    this.pressClear();
  }
}