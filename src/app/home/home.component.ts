import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  city_url: string = 'https://roundlaw.com/api/v1/places/cities';
  competency_url: string = 'https://roundlaw.com/api/v1/competencies';
  competency_id: string;
  city_id: string;
  lawers: Array<Object> = [];
  city$: Object;
  competency$: Object;


  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.get(this.city_url).subscribe(data => this.city$ = data);
    this.data.get(this.competency_url).subscribe(data => this.competency$ = data);
  }

  public onChangeCity(val:string) {
    this.city_id = val;
  }

  public onChangeCompetency(val:string) {
    this.competency_id = val;
  }

  private isEmptyObject(obj:Object) {
    return !(obj && (Object.keys(obj).length === 0));
  }

  private checkArray(arr){
    return arr.filter(el => this.isEmptyObject(el))
  }

  private getLawers() {
    return this.data.get(`https://roundlaw.com/api/v1/users/filter?competency_id='${this.city_id}'&city_id='${this.competency_id}`)
  }

  public sendData() {
    // this.data.get(`https://roundlaw.com/api/v1/users/filter?competency_id=5&city_id=26`)
    this.getLawers()
      .subscribe(res => {
        console.log(res);
        this.lawers = this.checkArray(res);
      });
  }
}
