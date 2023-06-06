import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { ɵHammerGesturesPlugin } from '@angular/platform-browser';
import { iCalculatorState } from './calculator-state';
import { iRequest } from './request';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl1 = "https://localhost:7172/api/calculator/singletermoperation";
  private apiUrl2 = "https://localhost:7172/api/calculator/multipletermoperation";
  
  
  constructor(private http: HttpClient) {}
   
  // public multipleTermRequest(request: iRequest) {
  //   const params = new HttpParams({ fromObject: request })
  //   this.http.get<string>(this.apiUrl2, {params}).subscribe((value: string) => { console.log(value) });
  // }

  }


  //  getResult(){
  //   return this.http.get<iRequest>(this.apiUrl);
  // }


  // CALCULATORSTATE = {operation:'', term:''};
  // RESULT: iRequest[] = [
  //   {CALCULATORSTATE: this.CALCULATORSTATE, buttonPressed:'' }
  // ]