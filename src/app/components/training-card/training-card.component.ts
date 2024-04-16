import { Component, Input } from '@angular/core';
import { Workout } from '../../interfaces/Workout';

@Component({
  selector: 'app-training-card',
  standalone: true,
  imports: [],
  templateUrl: './training-card.component.html',
  styleUrl: './training-card.component.css'
})
export class TrainingCardComponent {

  @Input() workout?:Workout;
}
