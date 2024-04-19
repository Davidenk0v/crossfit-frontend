import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorMessageComponent } from '../../../components/alerts/error-message/error-message.component';
import { SuccessMessageComponent } from '../../../components/alerts/success-message/success-message.component';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Category } from '../../../interfaces/Category';
import { MovementService } from '../../../services/movements/movement.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewMovementRequest } from '../../../interfaces/NewMovementRequest';
import { CategoryService } from '../../../services/categories/category.service';

@Component({
  selector: 'app-add-movement-form',
  standalone: true,
  imports: [AsyncPipe, ErrorMessageComponent, SuccessMessageComponent, ReactiveFormsModule],
  templateUrl: './add-movement-form.component.html',
  styleUrl: './add-movement-form.component.css'
})
export class AddMovementFormComponent {
  categories?: Observable<Category[]>;
  errorMessage?: string;
  successMessage?: string;

  constructor(private movementService:MovementService, private router:Router, private formBuilder:FormBuilder, private categoryService:CategoryService){}

  newMovementForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]]
  });

  ngOnInit():void {
    this.categories = this.categoryService.getAllCategories()
      .pipe(catchError((error:string)=> {
        this.errorMessage = error;
        return EMPTY;
      }))
  }

  addMovement(){
    if (this.newMovementForm.valid) {
      this.movementService
        .addMovement(this.newMovementForm.value as NewMovementRequest)
        .subscribe({
          next: (userData) => {
          },
          error: (errorData) => {
            this.errorMessage = errorData;
          },
          complete: () => {
            this.router.navigateByUrl('/movimientos');
            this.newMovementForm.reset();
          },
        });
    } else {
      this.newMovementForm.markAllAsTouched();
    }
  }
}
