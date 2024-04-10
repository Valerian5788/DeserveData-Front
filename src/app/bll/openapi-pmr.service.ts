import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Gares } from './gares';
import { BusStopResponse } from './bus-stop-reponse';

@Injectable({
  providedIn: 'root'
})
export class OpenapiPmrService {

  constructor(private _httpclient: HttpClient) { }
  gares!: string[];
  getGares(): Observable<Gares[]> {
    return this._httpclient.get<Gares[]>('https://pmr-pythonapi.onrender.com/StationsName');
  }

  getBusStop(radius: number, lon: number, lat: number): Observable<BusStopResponse> {
    radius = radius / 100;
    console.log(radius);
    
    return this.getCityName(lat, lon).pipe(
      switchMap(city_name => {
        return this._httpclient.get<BusStopResponse>(`https://pmr-pythonapi.onrender.com/TecStopAroundStation/?c=${city_name}&s=${lat}&l=${lon}&r=${radius}`);
      })
    );
  }

  getCityName(latitude: number, longitude: number): Observable<string> {
  return this._httpclient.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {responseType: 'json'})
    .pipe(
      map((data: any) => {
        const cityName = data.address.city || data.address.county;
        return cityName.split('-')[0];
      }),
      tap(cityName => console.log(cityName))
    );
}
}
