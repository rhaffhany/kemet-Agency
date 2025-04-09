import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  constructor(private _ProfileService:ProfileService){}
  
  searchIcon: string = "../../../assets/icons/Search.png";
  agencyPP:string = '../../../assets/img/Agency pp.png'
  kLogo:string = '../../../assets/logo/K.png'
  media1:string = '../../../assets/img/agency7.jpg'
  media2:string = '../../../assets/img/agency8.jpg'

  user:string = '@'
  travelAgencyData:any = {};
  media:any[] = [
    this.media1,
    this.media2
  ];

  ngOnInit(): void {
    this._ProfileService.getTravelAgencyData('GlobalTravel').subscribe({
      next: (data) => {
        this.travelAgencyData = data;
        // this.media = data.plan.$values;
        console.log(this.media);
        
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
