import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService) { }

  private DeployURL = 'https://kemet-server.runasp.net';

  getTravelAgencyCustomers():Observable<any>{
    const token = this._AuthService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return this._HttpClient.get(`${this.DeployURL}/api/TravelAgency/GetCustomers`, headers);
  }

}
