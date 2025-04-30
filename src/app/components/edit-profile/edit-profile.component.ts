import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  constructor(private _ProfileService:ProfileService, private ngZone: NgZone, private _Router:Router){}
  
  searchIcon: string = "../../../assets/icons/Search.png";
  agencyPP:string = '../../../assets/img/Agency pp.png'
  kLogo:string = '../../../assets/logo/K.png'
  media1:string = '../../../assets/img/agency7.jpg'
  media2:string = '../../../assets/img/agency8.jpg'
  media:any[] = [
    this.media1,
    this.media2
  ];


  user:string = '@'

  profileImg:string = '../../../assets/img/default-profile.png';
  newProfileImgPreview: string = '';
  newProfileImgFile: File | null = null;

  profileImgLoading = false;
  isEdited = false;
  isLoading = false;

  travelAgencyDash:any = {};
  updatedData:any = {...this.travelAgencyDash};

  
  locations: string[] = [
    'Cairo',
    'Alexandria',
    'Luxor',
    'Aswan',
    'Giza',
    'Sharm El Sheikh',
    'Suez'
  ];

  ngOnInit(): void {
    this._ProfileService.getTravelAgencyDashboard().subscribe({
      next: (res) =>{
        this.travelAgencyDash = res;
        this.updatedData= {...this.travelAgencyDash};
        console.log("updated data:",this.updatedData);
      }
    });
  }

  uploadProfileImg(event:any):void{
    const file = event.target.files[0];
    if (!file) {
      console.error('No file selected!');
      return;
    }

    this.profileImgLoading = true;

    const formData:FormData = new FormData();
    formData.append('model',file);

    this._ProfileService.uploadProfileImg(formData).subscribe({
      next:(res) =>{
        this.profileImg = `http://kemet-server.runasp.net/${res.filePath}`;
        this.isEdited = true;
        setTimeout(() => {
          this.profileImg = URL.createObjectURL(file);
          this.profileImgLoading = false; 
        }, 2000);
        Swal.fire({
          title: 'Success!',
          text: 'Your profile photo has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'var(--secondaryColor)',
        });
      },
      error:()=>{
        this.profileImgLoading = false; 
      }
    });

  }

  onEdit(): void {
    this.isEdited = true;
  }  

  updateAgencyData(): void{
    if (!this.isEdited) return;
    this.isLoading = true;

    this._ProfileService.editTravelAgencyProfile(this.updatedData).subscribe({
      next: (response)=>{

        this.travelAgencyDash = {...this.updatedData};
        this.updatedData = response;
        this.isEdited = false;

        Swal.fire({
          title: 'Success!',
          text: 'Your profile has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'var(--secondaryColor)',
        });

        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            location.reload();
          }, 2000); 
        }); 

        this._Router.navigate(['/profile']);
        
        
      },
      error: (err)=>{
        console.error("error updating:",err);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue updating your profile. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33',
        });
      },
      complete: () =>{
        this.isLoading = false;
      }
    });

  }

}
