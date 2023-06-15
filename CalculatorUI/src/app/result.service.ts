import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { ɵHammerGesturesPlugin } from '@angular/platform-browser';
import { iCalculatorInputMT ,iCalculatorInputST  } from './calculator-state';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  constructor(private http: HttpClient) {}
  private apiUrlMT = "https://localhost:7172/api/calculator/multipletermoperation";
  private apiUrlST = "https://calculatorarps.azurewebsites.net/api/calculator/multipletermoperation";

  multipleTerm(input: iCalculatorInputMT): Observable<any> {
    let params = new HttpParams()
      .set('ButtonClicked', `${input.term}_=`)
      .set('CalculatorState.CurrentOperation', input.operation);

    for (const termItem of input.termList) {
      params = params.append('CalculatorState.Terms', termItem);
    }

    return this.http.get<any>(this.apiUrlMT, { params }).pipe(
      map(value => value.calculatorResult)
    );
  }

  singleTerm(input: iCalculatorInputST): Observable<any> {
    let params = new HttpParams()
    .set('ButtonClicked', `${input.term}_=`)
    .set('CalculatorState.CurrentOperation', input.operation);

    return this.http.get<any>(this.apiUrlST, { params: params }).pipe
    (map(value => value.calculatorResult)
    );
  }
}