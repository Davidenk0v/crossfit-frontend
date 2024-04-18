import { Component } from '@angular/core';
import { ErrorMessageComponent } from '../../components/alerts/error-message/error-message.component';
import { SuccessMessageComponent } from '../../components/alerts/success-message/success-message.component';
import { AsyncPipe } from '@angular/common';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Movement } from '../../interfaces/Movement';
import { MovementService } from '../../services/movements/movement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [AsyncPipe,ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent {

  movements?: Observable<Movement[]>;
  errorMessage?: string;
  successMessage?: string;
  emptyMessage:string = "No hay movimientos";

  constructor(private movementService:MovementService, private router:Router){}

  receivedMessage?:string;

  ngOnInit(): void {
    this.movementService.sharedData.subscribe(value => {
      this.receivedMessage = value;
    });
    this.movements = this.movementService.getAllMovements()
      .pipe(catchError((error:string) => {
        this.errorMessage = error;
        return EMPTY;
      }))
      
  }

  deleteMovementById(id: number) {
    this.movementService.deleteMovement(id).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = response.OK; 
      },
      error: (errorData) => {
        this.errorMessage = errorData.Error;
      },
      complete: () => {
        this.movements = this.movementService.getAllMovements();
      },
    });
  }
}
