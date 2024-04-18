import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../../services/auth/register.service';
import { RegisterRequest } from '../../../interfaces/RegisterRequest';
import { ErrorMessageComponent } from '../../../components/alerts/error-message/error-message.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  errorMessage?:string;

  constructor(private formBuilder:FormBuilder, private router:Router, private registerService:RegisterService){}

  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]]
  });

  register() {
    if(this.registerForm.value.password === this.registerForm.value.password2){
    if (this.registerForm.valid) {
      this.registerService
        .register(this.registerForm.value as RegisterRequest)
        .subscribe({
          next: (userData) => {
          },
          error: (errorData) => {
            this.errorMessage = errorData;
          },
          complete: () => {
            this.router.navigateByUrl('/mis-entrenos');
            this.registerForm.reset();
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }else {
    this.errorMessage = "Las contraseñas deben coincidir"
  }
}
}
