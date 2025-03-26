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
  vector:string = '../../../assets/icons/Vector.png';
  vector1:string = '../../../assets/icons/Ellipse.png';

  mail:string ='kemet@example.com';

  isLoading:boolean =  false;
  errorMsg:string = '';

  loginForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  handleLogin():void{
    this.isLoading = true;
    if(this.loginForm.valid){
      this._AuthService.loginForm(this.loginForm.value).subscribe({
        next:(response) =>{
          localStorage.setItem('token', response.token);
          this._AuthService.saveUser();
          this.isLoading = false;
          this._Router.navigate(['/dashboard']);
        },
        error:(err) => {
          console.log(err);
          this.isLoading = false
        }
      });
    }
  }

  passwordVisible = false;
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

}
