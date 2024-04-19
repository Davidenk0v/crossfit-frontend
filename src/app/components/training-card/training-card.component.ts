import { Component, Input } from '@angular/core';
import { Workout } from '../../interfaces/Workout';
import { EntrenosService } from '../../services/entrenos.service';
import { JwtDecodeService } from '../../services/jwt-decode.service';

@Component({
  selector: 'app-training-card',
  standalone: true,
  imports: [],
  templateUrl: './training-card.component.html',
  styleUrl: './training-card.component.css'
})
export class TrainingCardComponent {

successMessage?:string;
errorMessage?:string;
idToken?:number;

constructor(private workoutService:EntrenosService, private jwtService:JwtDecodeService){}

  @Input() workout?:Workout;

  
  
  deleteMovementById(id: number) {
    this.workoutService.deleteWorkout(id).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = response.OK; 
      },
      error: (errorData) => {
        this.errorMessage = errorData.Error;
      },
      complete: () => {
        location.reload();
      },
    });
  }
}
