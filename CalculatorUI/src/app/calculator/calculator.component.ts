import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HostListener, Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResultService } from '../result.service';

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
  termList: string[] = [];
  operation = '';
  output: string = '';
  minus: string = '-';
  opFlag: boolean = false;

  constructor(private resultService: ResultService) { }
  
  calculateMT() {
    this.resultService.multipleTerm(this.term, this.termList, this.operation).subscribe(
      (value: any) => {
        this.output = value.message;
        this.input = value.value;
        this.clearTermList();
        this.termList.push(this.input);
      },
      (error: any) => {
        // Handle the error
      }
    );
  }
  calculateST() {
    this.resultService.singleTerm(this.term, this.operation).subscribe(
      (value: any) => {
        this.output = value.message;
        this.input = value.value;
        this.clearTermList();
        this.termList.push(this.input);
      },
      (error: any) => {
        // Handle the error
      }
    );
  }

  // public multipleTerm() {
  //   let params = new HttpParams()
  //     .set('ButtonClicked', `${this.term}_=`)
  //     .set('CalculatorState.CurrentOperation', this.operation);
  
  //   for (const term of this.termList) {
  //     params = params.append('CalculatorState.Terms', term);
  //   }
  
  //   this.http.get<any>(this.apiUrlMT, { params }).pipe(
  //     map(value => value.calculatorResult)
  //   ).subscribe((value: any) => {
  //     this.output = value.message;
  //     this.input = value.value;
  //     this.clearTermList();
  //     this.termList.push(this.input);
  //   });
  // }
  


  // public singleTerm() {
  //   let params = new HttpParams().set('ButtonClicked', this.term + "_=");
  //   params = params.set('CalculatorState.CurrentOperation', this.operation);
  //   this.http.get<any>(this.apiUrlST, { params: params }).pipe(map(value => value.calculatorResult)).subscribe((value: any) => {
  //     this.output = value.message;
  //     this.input = value.value;
  //     this.termList.length=0;
  //     this.termList.push(this.input)
  //   });
  // }

  pressEqual(){
    this.term = this.input;
    this.calculateMT();
    this.operation = '';
    this.opFlag= true;
  }

  pressNum(num: string) {
    if (this.opFlag){
      this.input = '';
      this.opFlag= false;
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
    this.opFlag = true;
    this.term = this.input;
    this.output = op;
    if (this.operation ===''){
      this.termList.length=0;
      this.termList.push(this.input)
    }
    else{
      this.calculateMT(); 
    }
    this.operation = op;
  }
  
  pressSTOperation(op: string) {
    this.opFlag = true;
    this.term = this.input;
    this.operation = op;
    this.calculateST()
    this.operation = '';
  }

  private clearTermList() {
    this.termList.length = 0;
  }
  pressDelete() {
    this.input = '0';
    this.operation = '';
    this.output = '';
    this.termList.length=0;
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





