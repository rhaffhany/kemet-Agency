import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _HttpClient:HttpClient) { }

  private DeployURL = 'https://kemet-server.runasp.net';

  travelAgencyData:any = {};

  getTravelAgencyData(travelAgencyName:any):Observable<any>{
    return this._HttpClient.get(`${this.DeployURL}/api/TravelAgency?travelAgencyName=${travelAgencyName}`);
  }

}
