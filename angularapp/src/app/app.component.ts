import { Component } from '@angular/core';
import { ServiceService } from './services/service.service';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angularapp';
  allCities: any = [];
  currentTime: any;
  lat = '';
  lon = '';
  cityname: string = '';
  errorMessage = false;
  placeholder = '';

  constructor(private city: ServiceService) {}

  ngOnInit() {
    this.getAllData();
    this.onGetCurrentCity();
  }

  async onGetLatLon() {
    await this.city.getPosition().then((pos) => {
      this.lat = pos.lat;
      this.lon = pos.lon;
    });
  }
  async onGetCurrentCity() {
    await this.onGetLatLon();
    this.city.getCurrentCity(this.lat, this.lon).subscribe((results: any) => {
      this.allCities.push({ results, time: this.currentTime });      
    });
  }

  onGetCity(city: string, save = '') {
    this.city.getCity(city).subscribe(
      (results: any) => {
        this.currentTime = new Date();
        this.allCities.push({ results, time: this.currentTime });
        this.cityname = '';
        this.errorMessage = false;
        if (save !== '') {
          this.saveAllData(results);
        }
      },
      (error) => {
        this.errorMessage = true;
        this.cityname = '';

        // throw error; //You can also throw the error to a global error handler
      }
    );
  }

  onGetGif(icon: string) {
    let url;
    if (icon === 'snow' || icon == 'light snow') {
      //snow
      url =
        "url('https://i.pinimg.com/originals/e0/c5/3a/e0c53a599372925c0fb876937187c9b7.gif')";
    } else if (icon === 'clear sky') {
      //clear sky
      url =
        "url('data:image/jpeg;base64,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')";
    } else if (
      icon == 'few clouds' ||
      icon == 'scattered clouds' ||
      icon == 'broken clouds' ||
      icon == 'overcast clouds'
    ) {
      //few clouds
      url = "url('https://c.tenor.com/PLqmB_SmXQMAAAAM/clouds-sky.gif')";
    } else if (icon == 'shower rain' || icon == 'rain') {
      //shower rain
      url =
        "url('https://www.icegif.com/wp-content/uploads/2021/11/icegif-707.gif')";
    } else if (icon == 'thunderstorm') {
      //thunderstom
      url = "url('https://thumbs.gfycat.com/MajorSpecificCricket-max-1mb.gif')";
    } else if (icon == 'mist' || icon == 'haze') {
      //mist
      url = "url('https://media4.giphy.com/media/ZWRCWdUymIGNW/giphy.gif')";
    }

    return url;
  }

  getAllData() {
    this.city.getSaveAllDB('get', '').subscribe((results: any) => {

      if (Array.isArray(results)) {
        results.forEach((ele: any) => {
          this.onGetCity(ele.body.name, '');
        });
      }
    });
  }

  saveAllData(results: any) {
    this.city.getSaveAllDB('post', results).subscribe((results: any) => {
      console.log(results);
    });
  }

  deleteData(id: string) {
    this.city.deleteCity(id).subscribe((results: string) => {
      console.log(results);
    });
  }
  deleteAllData() {
    this.city.deleteAllCities().subscribe((results) => {
      console.log(results);
    });
    this.allCities = this.allCities.filter(
      (ele: object, index: number) => index == 0 && ele
    );
  }
}
