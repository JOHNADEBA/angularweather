import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { key } from '../.././assets/secret';
const url = 'http://api.openweathermap.org/data/2.5/';
const dbUrl = `http://localhost:3000/`;

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  getCurrentCity(lat: string, lon: string) {
    return this.http.get<any>(
      `${url}weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    );
  }

  getCity(cityName: string) {
    return this.http.get<any>(
      `${url}weather?q=${cityName}&appid=${key}&units=metric`
    );
  }

  deleteCity(id: string) {
    return this.http.delete<any>(`${dbUrl}${id}`);
  }

  deleteAllCities() {
    return this.http.delete<any>(dbUrl);
  }

  getSaveAllDB(type: string, body: any) {
    if (type == 'get') {
      return this.http.get<any>(dbUrl);
    } else {
      return this.http.post<any>(dbUrl, { body });
    }
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lon: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
