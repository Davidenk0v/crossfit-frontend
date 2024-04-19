import { Component } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { User } from '../../interfaces/User';
import { UsersService } from '../../services/user/users.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { SuccessMessageComponent } from '../../components/alerts/success-message/success-message.component';
import { ErrorMessageComponent } from '../../components/alerts/error-message/error-message.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, SuccessMessageComponent, ErrorMessageComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users?: Observable<User[]>;
  errorMessage?: string;
  successMessage?: string;

  constructor(private userService:UsersService, private router:Router){}

  ngOnInit(): void {
    this.users = this.userService.getAllUsers()
      .pipe(catchError((error:string) => {
        this.errorMessage = error;
        return EMPTY;
      }))
  }

  deleteUserById(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        this.successMessage = response.OK;
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        this.users = this.userService.getAllUsers();
        this.router.navigateByUrl('/login')
      },
    });
  }
}
