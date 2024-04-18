import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { LoginRequest } from '../../../interfaces/LoginRequest';
import { ErrorMessageComponent } from '../../../components/alerts/error-message/error-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService){}

  errorMessage:string = '';

  loginForm= this.formBuilder.group({
    username:['',[Validators.required]],
    password:['', [Validators.required]]
  })

  get username(){
    return this.loginForm.controls.username;
   }
 
   get password(){
     return this.loginForm.controls.password;
   }

   login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData.token)
        },
        error: (errorData)=>{
          this.errorMessage=errorData;
        },
        complete: ()=>{
          this.router.navigateByUrl('/mis-entrenos');
          this.loginForm.reset();
        }
      });

    }else{
      this.loginForm.markAllAsTouched();
    }
  }
}
