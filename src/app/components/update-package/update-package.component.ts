import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from 'src/app/services/package.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-package',
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.scss']
})
export class UpdatePackageComponent {
  constructor(private _ProfileService:ProfileService,
              private _PackageService:PackageService, 
              private _ActivatedRoute:ActivatedRoute,
              private ngZone: NgZone, 
              private _Router:Router){}
  
  kLogo:string = '../../../assets/logo/K.png'

  travelAgencyDash:any = {};

  planDetails:any ={};

  plans:any[] = [];
  updatedPlan:any = {};
  
  planID:any;
  PlanName:string = '';
  Duration: number = 1;
  Description:string = '';
  PlanAvailability:string = '';
  PlanLocation:string = '';
  PictureFile: File | null = null;
  PictureUrl: string = '';
  // Images: File[] = [];
  // imagePreviews: string[] = [];
  EgyptianAdult:string = '';
  EgyptianStudent:string = '';
  TouristAdult:string = '';
  TouristStudent:string = '';


  isEdited = false;
  isLoading = false;
  
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

    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.planID = params.get('planID');
        this._PackageService.getDetailedPackage(this.planID).subscribe({
          next:(res) =>{
            this.planDetails = res;

            this.PlanName = res.planName;
            this.Duration = res.duration;
            this.Description = res.description;
            this.PlanAvailability = res.planAvailability;
            this.PlanLocation = res.planLocation;
            this.PictureUrl = res.imageURLs;

            this.EgyptianAdult = res.egyptianAdult.toString() || '';
            this.EgyptianStudent = res.egyptianStudent.toString() || '';
            this.TouristAdult = res.touristAdult.toString() || '';
            this.TouristStudent = res.touristStudent.toString() || '';

            this.updatedPlan = { ...res };
          }
        });
      }
    });

    this._ProfileService.getTravelAgencyDashboard().subscribe({
      next: (res) =>{
        this.travelAgencyDash = res;
      }
    });
        
    this._PackageService.getPackages().subscribe({
      next:(res)=>{        
        this.plans = res.plans.$values;
      },
    });

  }

  triggerPicInput(): void {
    document.getElementById('pic')?.click();
  }
  
  // triggerMediaInput(): void {
  //   document.getElementById('media')?.click();
  // }

  onPictureSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.PictureFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.PictureUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
    
  removePic() {
    this.PictureFile = null;
    this.PictureUrl = '';
  }

  // onImagesSelected(event: any) {
  //   const files = event.target.files;
  //   if (files) {
  //     for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     this.Images.push(file); 
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //     this.imagePreviews.push(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //     }
  //   }
  // }
  
  // removeImage(index: number) {
  //   this.imagePreviews.splice(index, 1);
  //   this.Images.splice(index, 1); 
  // }

  onEdit(): void {
    this.isEdited = true;
  }  
  
  updatePlanData(): void{
      if (!this.isEdited) return;
      this.isLoading = true;

      const formData:FormData = new FormData();
      formData.append('id', this.planID);
      formData.append('PriceId',this.planID);

      formData.append('PlanName',this.PlanName);
      formData.append('Duration',this.Duration.toString());
      formData.append('Description',this.Description);
      formData.append('PlanAvailability',this.PlanAvailability);
      formData.append('PlanLocation',this.PlanLocation);
      if (this.PictureFile) {
        formData.append('PictureUrl', this.PictureFile);
      }
      // this.Images.forEach((img) => {
      //   formData.append('NewImages', img);
      // });
      formData.append('Price.EgyptianAdult', this.EgyptianAdult.toString()); 
      formData.append('Price.EgyptianStudent', this.EgyptianStudent.toString());
      formData.append('Price.TouristAdult', this.TouristAdult.toString());
      formData.append('Price.TouristStudent', this.TouristStudent.toString());
  
      this._PackageService.editPackage(formData).subscribe({
        next: (response)=>{
  
          this.planDetails = {...this.updatedPlan};
          this.updatedPlan = response;
          this.isEdited = false;
  
          Swal.fire({
            title: 'Success!',
            text: 'Your profile has been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--secondaryColor)',
          });
          this._Router.navigate(['/packages']);
  
        },
        error: (err)=>{
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue updating your package. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33',
          });
          this.isLoading = false;
          console.error("error updating:",err);
        },
        complete: () =>{
          this.isLoading = false;
        }
      });
  
  }

}
