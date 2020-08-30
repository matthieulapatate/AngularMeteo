import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ForecastComponent } from './forecast/forecast.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from './Service/weather.service';
import { AppRoutingModule } from './app-routing.module';
import { DisplayWeatherComponent } from './display-weather/display-weather.component';
import { CurrentweatherComponent } from './currentweather/currentweather.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastComponent,
    FormComponent,
    DisplayWeatherComponent,
    CurrentweatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,

  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
