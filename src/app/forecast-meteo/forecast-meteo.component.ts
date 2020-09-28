import { Component, Inject, OnInit } from '@angular/core';
/* import { ActivatedRoute } from '@angular/router';
import { WeatherServiceService } from '../shared/services/weather-service.service'; */
import { DailyMeteo } from '../shared/models/DailyMeteo';
import { Subscription } from 'rxjs';
import { DisplayData } from '../display-data/display-data.component';
import { ActivatedRoute } from '@angular/router';
import { WeatherServiceService } from '../shared/services/weather-service.service';

@Component({
  selector: 'app-forecast-meteo',
  templateUrl: './forecast-meteo.component.html',
  styleUrls: ['./forecast-meteo.component.css']
})
export class ForecastMeteoComponent extends DisplayData implements OnInit {

  constructor(@Inject(ActivatedRoute) route: ActivatedRoute, @Inject(WeatherServiceService) weatherService: WeatherServiceService) {
    super(weatherService, route)
  }

  getMeteo(localisation: any) {
    if (localisation.city) {
      this.weatherService.getForecastWeatherbyCity(localisation.city).subscribe(datas => {
        for (let i = 0; i < 4; i++) {
          let dailydatas = datas.list[i];
          let oneDayMeteo: DailyMeteo;
          oneDayMeteo = new DailyMeteo();
          oneDayMeteo.city = datas.city.name;
          oneDayMeteo.date = this.getDate((dailydatas.dt + datas.city.timezone - 7200) * 1000);
          oneDayMeteo.temp = Math.round((dailydatas.main.temp - 273) * 10) / 10;
          oneDayMeteo.temp_feeling = Math.trunc(dailydatas.main.feels_like - 273);
          oneDayMeteo.temp_min = Math.trunc(dailydatas.main.temp_min - 273);
          oneDayMeteo.temp_max = Math.trunc(dailydatas.main.temp_max - 273);
          oneDayMeteo.description = dailydatas.weather[0].description;

          oneDayMeteo.icon = dailydatas.weather[0].icon;
          oneDayMeteo.pressure = dailydatas.main.pressure;
          oneDayMeteo.humidity = dailydatas.main.humidity;
          oneDayMeteo.wind = Math.round(Number(dailydatas.wind.speed) * 3.6 * 100) / 100;
          this.meteoData.push(oneDayMeteo);
        }

      });
    };
    if (localisation.lat && localisation.long) {
      this.weatherService.getForecastWeatherbyLoc(localisation.lat, localisation.long).subscribe(datas => {
        for (let i = 0; i < datas.list.length; i++) {
          let dailydatas = datas.list[i];
          let oneDayMeteo: DailyMeteo;
          oneDayMeteo = new DailyMeteo();
          oneDayMeteo.city = datas.city.name;
          oneDayMeteo.date = this.getDate((dailydatas.dt + datas.city.timezone - 7200) * 1000);
          oneDayMeteo.temp = Math.round((dailydatas.main.temp - 273) * 10) / 10;
          oneDayMeteo.temp_feeling = Math.trunc(dailydatas.main.feels_like - 273);
          oneDayMeteo.temp_min = Math.trunc(dailydatas.main.temp_min - 273);
          oneDayMeteo.temp_max = Math.trunc(dailydatas.main.temp_max - 273);
          oneDayMeteo.description = dailydatas.weather[0].description;

          oneDayMeteo.icon = dailydatas.weather[0].icon;
          oneDayMeteo.pressure = dailydatas.main.pressure;
          oneDayMeteo.humidity = dailydatas.main.humidity;
          oneDayMeteo.wind = Math.round(Number(dailydatas.wind.speed) * 3.6 * 100) / 100;
          this.meteoData.push(oneDayMeteo);
        }
      });
    };
  }
}
