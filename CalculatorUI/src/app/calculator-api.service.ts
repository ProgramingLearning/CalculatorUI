import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { ɵHammerGesturesPlugin } from '@angular/platform-browser';
import { iCalculatorInput } from './calculator-state';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { iCalculatorResult } from './result';

@Injectable({
  providedIn: 'root'
})
export class CalculatorApiService {
  constructor(private http: HttpClient) {}

  calculateMultipleTerm(input: iCalculatorInput, apiUrl: string): Observable<iCalculatorResult> {
    let params = new HttpParams().set('ButtonClicked', `${input.term}_=`);
    if (input.termList) {
      for (const termItem of input.termList) {
        params = params.append('CalculatorState.Terms', termItem);
      }
    }
    params = params.set('CalculatorState.CurrentOperation', input.operation);
    return this.http.get<any>(apiUrl, { params }).pipe(
      map(value => value.calculatorResult),
    );
  }

  calculateSingleTerm(input: iCalculatorInput, apiUrl: string): Observable<iCalculatorResult> {
    let params = new HttpParams().set('ButtonClicked', `${input.term}_${input.operation}`);
    return this.http.get<any>(apiUrl, { params }).pipe(
      map(value => value.calculatorResult),
    );
  }

}
