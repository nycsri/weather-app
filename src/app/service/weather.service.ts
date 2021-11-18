import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ILocation } from '../model/ILocation';
import { ILocationWeather } from '../model/ILocationWeather';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  APP_KEY = '0cdca69300e165a296b2b05f07fdf820';
  //uncomment while running ng serve in dev
  WEATHER_API_URL = "api";
  //cors issue on the browser - use proxy
  //WEATHER_API_URL ="http://api.openweathermap.org/data/2.5/weather";
  constructor(private http: HttpClient) {}
  getCurrentWeatherForLocation(location: ILocation) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    });
    const params = new HttpParams()
          .set("lat", location.lat)
          .set("lon", location.long)
          .set("appId",this.APP_KEY)
          .set( 'units', 'metric');
    return this.http.get(this.WEATHER_API_URL, { headers: headers, responseType: "json",params:params});
  }
}



