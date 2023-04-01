import { HostListener, Component } from '@angular/core';



@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  input: string = '';
  term: string = '';
  operation = '';
  output: string = '';
  opFlag: boolean = false;

  validateInput(input: string) {

  }
  pressNum(num: string) {
    if (this.input.length < 15) {
      if (this.opFlag == true) {
        this.term = this.input;
        this.input = '';
        this.opFlag = false;
      }
      if (num == '.') {
        if (this.input.includes(".")) {
          this.output = "nu mai adaug un punct nubo";
        }
        else if (this.input === '') { this.input.concat("0",num) }
        else {
          this.input = this.input.concat(num);
        }

      }

      else {
        this.input = this.input.concat(num);
      }

    }
    else {
      this.output = this.input;
      console.log(num);
    }
  }

  pressOperation(num: string) {
    this.operation = num;
    this.output = num;
    this.opFlag = true;

  }

  pressDelete(num: string) {
    if (num == 'delete') {
      this.input = this.input.slice(0, this.input.length - 1);
    }
    else if (num == 'CE') {
      this.input = '';
      this.operation = '';
      this.output = '';
      this.opFlag = false;
    }
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
    this.pressNum('.');
  }
  @HostListener('window:keydown.backspace', ['$event'])
  onDelKeyPress(event: KeyboardEvent) {
    this.pressDelete('delete');
  }

}





