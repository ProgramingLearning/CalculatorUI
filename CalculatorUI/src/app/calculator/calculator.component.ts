import { HostListener, Component } from '@angular/core';

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
  term: string = '';
  operation = '';
  output: string = '';
  opFlag: boolean = false;
  minus: string = '-'

  pressNum(num: string) {
    if (this.opFlag == true) {
      this.term = this.input;
      this.input = '';
      this.opFlag = false;
      this.operation = '';
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

  pressOperation(op: string) {
    this.operation = op;
    this.output = op;
    this.opFlag = true;
  }

  pressDelete() {
    this.input = '0';
    this.operation = '';
    this.output = '';
    this.opFlag = false;
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
    this.pressOperation('+');
  }
  @HostListener('window:keydown.-', ['$event'])
  onMinusKeyPress(event: KeyboardEvent) {
    this.pressOperation('-');
  }
  @HostListener('window:keydown./', ['$event'])
  onDivKeyPress(event: KeyboardEvent) {
    this.pressOperation('/');
  }
  @HostListener('window:keydown.*', ['$event'])
  onMultKeyPress(event: KeyboardEvent) {
    this.pressOperation('*');
  }
  @HostListener('window:keydown.Enter', ['$event'])
  onEnterKeyPress(event: KeyboardEvent) {
    this.pressOperation('=');
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





