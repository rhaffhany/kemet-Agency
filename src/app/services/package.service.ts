import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService) { }
  private DeployURL = 'https://kemet-server.runasp.net';

  getPackages():Observable<any>{
    const token = this._AuthService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return this._HttpClient.get(`${this.DeployURL}/api/TravelAgency/GetTravelAgencyPlanStats`, headers);
  }

  addPacakage(formData: FormData):Observable<any>{
    const token = this._AuthService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return this._HttpClient.post(`${this.DeployURL}/api/TravelAgency/add-plan`, formData , headers);
  }
  
}
