import { Component } from '@angular/core';
import { TrainingCardComponent } from '../../components/training-card/training-card.component';
import { EntrenosService } from '../../services/entrenos.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Workout } from '../../interfaces/Workout';

@Component({
  selector: 'app-entrenos',
  standalone: true,
  imports: [TrainingCardComponent],
  templateUrl: './entrenos.component.html',
  styleUrl: './entrenos.component.css'
})
export class EntrenosComponent {

  constructor(private workoutService:EntrenosService, ){}

  errorMessage?:string;
  workouts?: Observable<Workout[]>;

  ngOnInit(): void {
    this.workouts = this.workoutService.getAllWorkout()
              .pipe(catchError((error:string)=> {
                this.errorMessage = error;
                return EMPTY;
              }))
  }
}
