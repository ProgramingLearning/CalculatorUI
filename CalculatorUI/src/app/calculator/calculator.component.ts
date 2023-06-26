import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HostListener, Component } from '@angular/core';
import { CalculatorApiService } from '../calculator-api.service';
import { iCalculatorState } from '../calculator-state';
import { iCalculatorResultST, iCalculatorResultMT } from '../result';
import { iCalculatorResponseMT, iCalculatorResponseST } from '../calculator-response';
import { iCalculatorRequest, iCalculatorRequestST } from '../calculator-request';
// import { iCalculatorResult } from '../result';

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
  state : iCalculatorState = {}as any;

  constructor(private apiService: CalculatorApiService) { }

  pressEqual() {
    const request : iCalculatorRequest = {
      state : this.state,
      buttonClicked : `${this.input}_=` 
    };
    this.apiService.calculateMultipleTerm(request).subscribe(
      (response: iCalculatorResponseMT) => {
        this.state = response.calculatorState;
        if (response.calculatorResult != null){
          this.handleResultMT(response.calculatorResult);
        }
      },
    );
  }

  pressMTOperation(op: string) {
    this.opFlag = true;
    const request : iCalculatorRequest = {
      state : this.state,
      buttonClicked : `${this.input}_${op}` 
    };
    this.apiService.calculateMultipleTerm(request).subscribe(
      (response: iCalculatorResponseMT) => {
        this.state = response.calculatorState;
        if (response.calculatorResult){
          console.log(response.calculatorResult);
          this.handleResultMT(response.calculatorResult);
        }
      },
    );
  }

  pressSTOperation(op: string) {
    this.opFlag = true;
    const request: iCalculatorRequestST = {
      buttonClicked : `${this.input}_${op}`
    };
    this.apiService.calculateSingleTerm(request).subscribe(
      (response: iCalculatorResponseST) => {
        this.handleResultST(response.calculatorResult);
      },
    );
  }

  private handleResultMT(result: iCalculatorResultMT) {
    this.output = result.message;
    this.input = result.value;
  }
  private handleResultST(result: iCalculatorResultST) {
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

  pressCS() {
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

  pressDelete() {
    this.input = '0';
    this.output = '';
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
    this.pressMTOperation('+');
  }
  @HostListener('window:keydown.-', ['$event'])
  onMinusKeyPress(event: KeyboardEvent) {
    this.pressMTOperation('-');
  }
  @HostListener('window:keydown./', ['$event'])
  onDivKeyPress(event: KeyboardEvent) {
    this.pressMTOperation('/');
  }
  @HostListener('window:keydown.*', ['$event'])
  onMultKeyPress(event: KeyboardEvent) {
    this.pressMTOperation('*');
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
    this.pressDelete();
  }
}





