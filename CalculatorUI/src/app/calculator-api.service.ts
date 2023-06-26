import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { ɵHammerGesturesPlugin } from '@angular/platform-browser';
import { iCalculatorState } from './calculator-state';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iCalculatorResultST, iCalculatorResultMT } from './result';
import { iCalculatorResponseMT, iCalculatorResponseST } from './calculator-response';
import { iCalculatorRequest, iCalculatorRequestST } from './calculator-request';

@Injectable({
  providedIn: 'root'
})
export class CalculatorApiService {
  private apiUrlMT: string = "https://calculatorarps.azurewebsites.net/api/calculator/multipletermoperation";
  private apiUrlST = "https://calculatorarps.azurewebsites.net/api/calculator/singletermoperation";

  constructor(private http: HttpClient) { }

  calculateMultipleTerm(input: iCalculatorRequest): Observable<iCalculatorResponseMT> {
    let params = new HttpParams().set('ButtonClicked', `${input.buttonClicked}`);
    if (input.state?.terms) {
      for (const termItem of input.state.terms) {
        params = params.append('CalculatorState.Terms', termItem);
      }
    }
    if (input.state?.currentOperation) {
      params = params.set('CalculatorState.CurrentOperation', input.state.currentOperation);
    }
    return this.http.get<iCalculatorResponseMT>(this.apiUrlMT, { params }).pipe(
      map(value => value),
    );
  }

  calculateSingleTerm(input: iCalculatorRequestST): Observable<iCalculatorResponseST> {
    let params = new HttpParams().set('ButtonClicked', `${input.buttonClicked}`);
    return this.http.get<any>(this.apiUrlST, { params }).pipe();
  }
}
