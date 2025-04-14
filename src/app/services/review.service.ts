import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

constructor(private _HttpClient:HttpClient, private _AuthService:AuthService) { }

  private DeployURL = 'https://kemet-server.runasp.net';

  getReviews():Observable<any>{
    const token = this._AuthService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return this._HttpClient.get(`${this.DeployURL}/api/TravelAgency/GetTravelAgencyReviewStats`, headers)
  }
}
