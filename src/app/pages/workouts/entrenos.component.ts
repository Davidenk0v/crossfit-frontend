import { Component } from '@angular/core';
import { TrainingCardComponent } from '../../components/training-card/training-card.component';
import { EntrenosService } from '../../services/entrenos.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Workout } from '../../interfaces/Workout';
import { AsyncPipe } from '@angular/common';
import { JwtDecodeService } from '../../services/jwt-decode.service';
import { User } from '../../interfaces/User';
import { ErrorMessageComponent } from '../../components/alerts/error-message/error-message.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-entrenos',
  standalone: true,
  imports: [AsyncPipe, TrainingCardComponent, ErrorMessageComponent, RouterModule],
  templateUrl: './entrenos.component.html',
  styleUrl: './entrenos.component.css'
})
export class EntrenosComponent {

  constructor(private workoutService:EntrenosService, private jwtService:JwtDecodeService){}
  noWorkoutMessage = "No hay entrenos aún";
  errorMessage?:string;
  successMessage?:string;
  workouts?: Observable<Workout[]>;
  idToken?:number
  user?:User;

  ngOnInit(): void {
    this.idToken = this.jwtService.getId() ?? 0;
    this.workouts = this.workoutService.getAllWorkout(this.idToken)
              .pipe(catchError((error:string)=> {
                this.errorMessage = error;
                return EMPTY;
              }));
  }

}
