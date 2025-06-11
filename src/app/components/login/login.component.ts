import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService, 
              private _Router:Router){}

  Logo:string = '../../../assets/logo/K.png';
  vector:string = '../../../assets/img/Vector.png';
  vector1:string = '../../../assets/img/Ellipse.png';

  mail:string ='kemet@example.com';

  isLoading:boolean =  false;
  errorMsg:string = 'Account not found, please check your email and password';
  errorMsg2:string = 'Please enter your email and password';
  errorMsg3:string = 'Please enter a valid email address';

  loginForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  currentErrorMsg: string = '';

  handleLogin():void{
    this.isLoading = true;
    this.currentErrorMsg = '';
    if(this.loginForm.valid){
      this._AuthService.loginForm(this.loginForm.value).subscribe({
        next:(response) =>{
          localStorage.setItem('token', response.token);
          this._AuthService.saveUser();
          this.isLoading = false;
          this._Router.navigate(['/profile']);
        },
        error:(err) => {
          console.log(err);
          this.isLoading = false;
          if (err.status === 401 || err.status === 404) {
            this.currentErrorMsg = this.errorMsg; 
          } else if (err.status === 400) {
            this.currentErrorMsg = this.errorMsg2; 
          } else {
            this.currentErrorMsg = 'An unexpected error occurred. Please try again.';
          }
        }
      });
    } else {
      this.isLoading = false;
      this.currentErrorMsg = this.errorMsg2; 
    }
  }

  passwordVisible = false;
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

}
