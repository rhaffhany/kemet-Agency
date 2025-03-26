import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  private DeployURL = 'https://kemet-server.runasp.net';

  agencyData:any;

  loginForm(agencyData:any):Observable<any>{
    return this._HttpClient.post(`${this.DeployURL}/api/Accounts/TravelAgencyLogin`, agencyData);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUser(){
    const encode = localStorage.getItem('token');
    if(encode){
      const decode = jwtDecode(encode);
      this.agencyData = decode;
    }
  }
  
}
