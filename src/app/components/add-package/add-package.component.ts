import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent {

  constructor(private _ProfileService:ProfileService){}
  
  searchIcon: string = "../../../assets/icons/Search.png";
  agencyPP:string = '../../../assets/img/Agency pp.png'
  kLogo:string = '../../../assets/logo/K.png'
  media1:string = '../../../assets/img/agency7.jpg'
  media2:string = '../../../assets/img/agency8.jpg'
  media:any[] = [
    this.media1,
    this.media2
  ];
  selectedLocation: any;
  locations: string[] = [
    'Cairo',
    'Alexandria',
    'Luxor',
    'Aswan',
    'Giza',
    'Sharm El Sheikh',
    'Suez'
  ];
  days: number = 1;

  user:string = '@'
  travelAgencyData:any = {};
  travelAgencyDash:any = {};

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
    this._ProfileService.getTravelAgencyDashboard().subscribe({
      next: (res) =>{
        this.travelAgencyDash = res;
      }
    });
  }

}
