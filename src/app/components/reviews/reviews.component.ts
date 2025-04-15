import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  constructor(private _ReviewService:ReviewService, private _ProfileService:ProfileService) {}

  agencyPP:string = '../../../assets/img/Agency pp.png'
  kLogo:string = '../../../assets/logo/K.png'

  searchIcon:string = "/assets/icons/Search.png"
  searchResults: any[] = [];  
  errorMessage: string = ''; 

  reviews:any[] = [];
  ratingStats:any = {};

  data: any;
  options: any;
  // totalReviews = 100; // Replace with API data

  satisfactionRate = 60; // just bind this dynamically later if you like


  travelAgencyDash:any = {};

  ngOnInit(): void {
    
    this._ProfileService.getTravelAgencyDashboard().subscribe({
      next: (res) =>{
        this.travelAgencyDash = res;
      }
    });

    this._ReviewService.getReviews().subscribe({
      next: (data)=>{
        this.reviews = data.reviews.$values;
        console.log('reviews:', this.reviews);
        this.ratingStats = data.satisfactionRate;
        console.log('ratingStats:', this.ratingStats);
        
      }
    });

    // char data
    this.data = {
      labels: [ '95%'],
      datasets: [
        {
          data: [15], // Example data (replace with API values)
          backgroundColor: [
            '#ff0000', // Red for 0%
            // '#FF7F3F', // Blue for 95%
            // '#FFA931'  // Teal for 100%
          ],
          hoverBackgroundColor: [
            '#ff6384',
            // '#36a2eb',
            // '#4bc0c0'
          ]
        }
      ]
    };
    this.options = {
      cutout: '80%', // Makes it a doughnut
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          enabled: true 
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };

  }

  // fetchData() {
  //   // Example API call (replace with your actual endpoint)
  //   this.http.get('your-api-endpoint').subscribe((res: any) => {
  //     this.chartData.datasets[0].data = [
  //       res.zeroPercent,
  //       res.ninetyFivePercent,
  //       res.hundredPercent
  //     ];
  //     this.totalReviews = res.totalReviews;
  //   });
  // }

}
