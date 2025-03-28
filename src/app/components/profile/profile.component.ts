import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  constructor(private _ProfileService:ProfileService){}

  searchIcon: string = "../../../assets/icons/Search.png";
  agencyPP:string = '../../../assets/img/Agency pp.png'
  user:string = '@'
  travelAgencyData:any = {};

  ngOnInit(): void {
    this._ProfileService.getTravelAgencyData('GlobalTravel').subscribe({
      next: (data) => {
        this.travelAgencyData = data;
        // this.reviews = data.reviews.$values;
        // console.log("Reviews",this.reviews);
        // console.log('Travel Agency Data:', this.travelAgencyData);
      },
      error: (err) => {
        console.error('Error fetching travel agency data:', err);
      }
    });
  }

}
