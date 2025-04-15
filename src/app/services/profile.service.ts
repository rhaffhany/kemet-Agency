import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService) { }

  private DeployURL = 'https://kemet-server.runasp.net';

  travelAgencyData:any = {};


  // getTravelAgencyData(travelAgencyName:any):Observable<any>{
  //   return this._HttpClient.get(`${this.DeployURL}/api/TravelAgency?travelAgencyName=${travelAgencyName}`);
  // }

  getTravelAgencyDashboard():Observable<any>{
    const token = this._AuthService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return this._HttpClient.get(`${this.DeployURL}/api/TravelAgency/GetTravelAgnecyDashboard`, headers);
  }

  uploadProfileImg(formData: FormData):Observable<any>{
    const token = this._AuthService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };   
    return this._HttpClient.post(`${this.DeployURL}/api/TravelAgency/upload-profile-image`, formData, headers);
  }


  editTravelAgencyProfile(updatedData: any):Observable<any>{
    const token = this._AuthService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };    
    return this._HttpClient.put(`${this.DeployURL}/api/TravelAgency/EditTravelAgencyProfile`, updatedData , headers);
  }

}
