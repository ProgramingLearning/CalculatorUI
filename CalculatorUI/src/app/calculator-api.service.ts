import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';
import { CalculatorResponseMT, CalculatorResponseST } from './calculator-response';
import { CalculatorRequestMT, CalculatorRequestST } from './calculator-request';

@Injectable({
  providedIn: 'root'
})
export class CalculatorApiService {
  private apiUrlMT: string = "https://calculatorarps.azurewebsites.net/api/calculator/multipletermoperation";
  private apiUrlST = "https://calculatorarps.azurewebsites.net/api/calculator/singletermoperation";

  constructor(private http: HttpClient) { }

  calculateMultipleTerm(input: CalculatorRequestMT): Observable<CalculatorResponseMT> {
    let params = new HttpParams().set('ButtonClicked', `${input.buttonClicked}`);
    if (input.state?.terms) {
      for (const termItem of input.state.terms) {
        params = params.append('CalculatorState.Terms', termItem);
      }
    }
    if (input.state?.currentOperation) {
      params = params.set('CalculatorState.CurrentOperation', input.state.currentOperation);
    }
    return this.http.get<CalculatorResponseMT>(this.apiUrlMT, { params }).pipe(
      map(value => value),
    );
  }

  calculateSingleTerm(input: CalculatorRequestST): Observable<CalculatorResponseST> {
    let params = new HttpParams().set('ButtonClicked', `${input.buttonClicked}`);
    return this.http.get<any>(this.apiUrlST, { params }).pipe();
  }
}
