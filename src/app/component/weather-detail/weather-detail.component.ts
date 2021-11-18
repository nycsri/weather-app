import { Component, OnInit } from '@angular/core';
import { ILocation } from 'src/app/model/ILocation';
import { LocationService } from 'src/app/service/location.service';
import { WeatherService } from 'src/app/service/weather.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {
  weatherForm!: FormGroup;
  location: ILocation;
  weatherAtLocation:any;
  temp:String;

  constructor( private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.createForm();
}

private createForm() {
  this.weatherForm= new FormGroup({
    lat: new FormControl('',{ validators: [Validators.required] }),
    long: new FormControl('',{ validators: [Validators.required] }),
  });
}

  onSubmit() {
     const location:ILocation = this.weatherForm.value;
     this.weatherService.getCurrentWeatherForLocation(location).subscribe(data=> {
       this.weatherAtLocation =  JSON.parse(JSON.stringify(data));
       this.temp = this.weatherAtLocation['main']['temp'] +" C";
       console.log(this.weatherAtLocation);
     });

  }
}
