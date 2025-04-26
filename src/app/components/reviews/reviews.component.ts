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
  profileImg: string = '../../../assets/img/default-profile.png';


  searchIcon:string = "/assets/icons/Search.png"

  reviews:any[] = [];
  filteredReviews:any[] = [];
  ratingStats:any;
  satisfactionRate:any;
  ratingPercents: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  data: any;
  options: any;
  // totalReviews = 100; // Replace with API data

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
        this.filteredReviews = [...this.reviews];
        this.satisfactionRate = data.satisfactionRate;
        this.ratingStats = data.ratingStats;       
        console.log(this.ratingStats);
        this.reviews.forEach(review => {
          const rating = review.rating;
          if (this.ratingStats[rating] !== undefined) {
            this.ratingStats[rating]++;
          }
        });

        const totalReviews = this.reviews.length;
        for (let i = 1; i <= 5; i++) {
          this.ratingPercents[i] = totalReviews > 0
            ? Math.round((this.ratingStats[i] / totalReviews) * 100)
            : 0;
        }
         
      }
    });

  }

  getEmojiForSatisfaction(rate: number): string {
    if (rate >= 0 && rate <= 20) return '😡'; 
    if (rate <= 40) return '😞'; 
    if (rate <= 60) return '😐'; 
    if (rate <= 80) return '🙂'; 
    return '😍'; 
  }

  //reviews filters
  toggleFilterOptions:boolean = false;

  sortByMostRecent() {
    this.reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  filterByRating(order: 'high' | 'low') {
    this.reviews.sort((a, b) => {
      return order === 'high' ? b.rating - a.rating : a.rating - b.rating;
    });
  }
  resetFilters() {
    return this.reviews = [...this.filteredReviews];
  }

  //search 
  searchText: string = ''; 
  searchResults: any[] = [];
  errorMessage: string = ''; 

  onSearch() {
    const query = this.searchText.trim().toLowerCase();
  
    if (query === '') {
      this.searchResults = [];
      this.errorMessage = '';
      return;
    }
  
    this.searchResults = this.reviews.filter(review =>
      Object.values(review).some(value =>
        value && value.toString().toLowerCase().includes(query)
      )
    );
  
    this.errorMessage = this.searchResults.length === 0 ? 'No results found.' : '';
  }


}
