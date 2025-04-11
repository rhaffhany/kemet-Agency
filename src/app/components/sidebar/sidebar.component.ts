import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private _ProfileService:ProfileService, private _Router:Router){}
  
  logo:string = '../../../assets/logo/kemet.png'
  kLogo:string = '../../../assets/logo/K.png'
  agencyPP:string = '../../../assets/img/Agency pp.png'
  user:string = '@'
  isCollapsed:boolean = false;
  selectedItem: string = '';

  travelAgencyData:any = {};
  isDropdownOpen:boolean = false;  


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

  menuItems = [
    { label: 'Profile', icon: 'fa-regular fa-circle-user', path: '/profile' },
    { label: 'Packages', icon: 'fa fa-box', path: '/packages' },
    { label: 'Customers', icon: 'fa fa-users', path: '/customers' },
    { label: 'Reviews', icon: 'fa-regular fa-star', path: '/reviews' },
    { label: 'Income', icon: 'fa-solid fa-coins', path: '/income' },
    { label: 'Questions', icon: 'fa-regular fa-circle-question', path: '/questions' }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  selectItem(path: string) {
    this.selectedItem = path; 
    this.selectedItem = this._Router.url;
  }

  // toggleDropdown() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }

  showLogoutPopup: boolean = false;

  toggleLogoutPopup() {
    this.showLogoutPopup = !this.showLogoutPopup;
  }

  closePopup(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.logout-popup')) {
      this.showLogoutPopup = false;
    }
  }
  
  logout() {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }

  //speeddial
  // speedDialVisible: boolean = false;

  // items = [
  //   {
  //     label: 'Logout',
  //     icon: 'fa-solid fa-arrow-right-from-bracket', 
  //     command: () => this.logout()
  //   },
  //   { 
  //     icon: 'pi pi-user', 
  //     command: () => alert("Profile clicked") 
  //   },
  //   { 
  //     icon: 'pi pi-cog', 
  //     command: () => alert("Settings clicked") 
  //   }
  // ];

  // toggleSpeedDial() {
  //   this.speedDialVisible = !this.speedDialVisible;
  //   console.log("selectedd success", this.speedDialVisible);
    
  // }

}
