import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit{
    constructor(private _ProfileService:ProfileService){}
  
    searchIcon: string = "../../../assets/icons/Search.png";
    agencyPP:string = '../../../assets/img/Agency pp.png'
    kLogo:string = '../../../assets/logo/K.png'
    adminEmail:string = 'admin@gmail.com';
  
    user:string = '@'
    travelAgencyData:any = {};
    media:any[] = [];
  
    ngOnInit(): void {
  
      this._ProfileService.getTravelAgencyDashboard().subscribe({
        next: (res) =>{
          this.travelAgencyData = res;
        }
      });
  
    }

    message: string = `Hello Kemet Support,

    We’re experiencing an issue on our travel agency dashboard — the total income section is not appearing as expected.
    
    Our agency name is [Your Agency Name], and our registered email is [your@email.com].
    
    Kindly look into this issue at your earliest convenience.
    
    Thank you in advance for your support!
    
    Best regards,`;
    sendEmail(): void {
      const subject = encodeURIComponent('Support Request from Travel Agency');
      const body = encodeURIComponent(this.message);
      window.location.href = `mailto:${this.adminEmail}?subject=${subject}&body=${body}`;
    }

}
