import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Gares } from './gares';

@Injectable({
  providedIn: 'root'
})
export class OpenapiPmrService {

  constructor(private _httpclient: HttpClient) { }
  gares!: string[];
  getGares(): Observable<Gares[]> {
    return this._httpclient.get<Gares[]>('https://pmr-pythonapi.onrender.com/StationsName');
  }
  
}
