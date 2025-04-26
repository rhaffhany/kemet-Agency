import { Component } from '@angular/core';
import { PackageService } from 'src/app/services/package.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent {

  constructor(private _ProfileService:ProfileService, private _PackageService:PackageService){}
  
  searchIcon: string = "../../../assets/icons/Search.png";
  agencyPP:string = '../../../assets/img/Agency pp.png'
  kLogo:string = '../../../assets/logo/K.png'

  imagePreviews: string[] = [];
  
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

  ngOnInit(): void {
    this._ProfileService.getTravelAgencyDashboard().subscribe({
      next: (res) =>{
        this.travelAgencyData = res;
      }
    });
  }

  PlanName:string = '';
  Duration: number = 1;
  Description:string = '';
  PlanAvailability:string = '';
  PlanLocation:string = '';
  PictureFile: File | null = null;
  PictureUrl: string = '';
  Images: File[] = [];
  EgyptianAdult:string = '';
  EgyptianStudent:string = '';
  TouristAdult:string = '';
  TouristStudent:string = '';

  triggerPicInput(): void {
    document.getElementById('pic')?.click();
  }
  
  triggerMediaInput(): void {
    document.getElementById('media')?.click();
  }

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

  onImagesSelected(event: any) {
      const files = event.target.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          this.Images.push(file); 
          const reader = new FileReader();
          reader.onload = () => {
            this.imagePreviews.push(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      }
    }
    
  
  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
    this.Images.splice(index, 1); 
  }

  isLoading:boolean = false;
  isEdited:boolean = false;
  onEdit(): void {
    this.isEdited = true;
  }  

  addPackage():void{
    if (!this.isEdited) return;
    this.isLoading = true;

    const formData:FormData = new FormData();
    formData.append('PlanName',this.PlanName);
    formData.append('Duration',this.Duration.toString());
    formData.append('Description',this.Description);
    formData.append('PlanAvailability',this.PlanAvailability);
    formData.append('PlanLocation',this.PlanLocation);
    if (this.PictureFile) {
      formData.append('PictureUrl', this.PictureFile);
    }
    this.Images.forEach((img) => {
      formData.append('Images', img);
    });
    formData.append('Price.EgyptianAdult', this.EgyptianAdult.toString()); 
    formData.append('Price.EgyptianStudent', this.EgyptianStudent.toString());
    formData.append('Price.TouristAdult', this.TouristAdult.toString());
    formData.append('Price.TouristStudent', this.TouristStudent.toString());


    this._PackageService.addPacakage(formData).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Success!',
          text: 'The package has been added successfully.',
          icon: 'success',
          confirmButtonColor: 'var(--secondaryColor)',
        });
        this.clearAllInputs();
        this.isLoading = false;

        console.log("sucess>>",res);
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: 'Incomplete Data or Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  clearAllInputs() {
    this.PictureFile = null;
    this.PictureUrl = '';
    this.imagePreviews = [];
    this.Description = '';
    this.PlanName = '';
    this.PlanLocation = '';
    this.PlanAvailability = '';
    this.Duration = 0;
    this.TouristStudent = '';
    this.TouristAdult = '';
    this.EgyptianStudent = '';
    this.EgyptianAdult = '';
    this.Images = [];
  }



  
}
