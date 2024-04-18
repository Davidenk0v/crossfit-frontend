import { Component } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Category } from '../../../interfaces/Category';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { CategoryService } from '../../../services/categories/category.service';
import { Router } from '@angular/router';
import { EntrenosService } from '../../../services/entrenos.service';
import { WorkoutRequest } from '../../../interfaces/WorkoutRequest';
import { JwtDecodeService } from '../../../services/jwt-decode.service';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css'
})
export class AddWorkoutComponent {

  errorMessage?: string;
  successMessage?: string;
  intensities = ['LOW', 'MEDIUM', 'HIGH'];

  constructor(private jwtService:JwtDecodeService, private router:Router, private formBuilder:FormBuilder, private categoryService:CategoryService, private workoutService:EntrenosService){}

  newWorkoutForm = this.formBuilder.group({
    idUser:[this.jwtService.getId],
    name: ['', [Validators.required]],
    intensity: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  addWorkout(){
    if (this.newWorkoutForm.valid) {
      this.workoutService
        .addWorkout(this.newWorkoutForm.value as WorkoutRequest)
        .subscribe({
          next: (userData) => {
            console.log(userData);
          },
          error: (errorData) => {
            this.errorMessage = errorData;
          },
          complete: () => {
            this.router.navigateByUrl('/mis-entrenos');
            this.newWorkoutForm.reset();
          },
        });
    } else {
      this.newWorkoutForm.markAllAsTouched();
    }
  }
}
