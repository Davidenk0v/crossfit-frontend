import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../../interfaces/User';
import { EMPTY, Observable, catchError } from 'rxjs';
import { UsersService } from '../../../services/user/users.service';
import { HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../../interfaces/JwtPayload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-data',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.css'
})
export class MyDataComponent {

  token:string = sessionStorage.getItem('token') ?? ''; 
  userInfo?: Observable<User>;
  errorMessage?: string;

  constructor(private userService:UsersService, private router:Router){}

  ngOnInit(): void {
    const username = jwtDecode(this.token).sub;

    if(username != null){
      this.userInfo = this.userService.getUserInfo(username)
      .pipe(catchError((error:string)=> {
        this.errorMessage = error;
        return EMPTY;
      }));
    }
    }

    deleteUserById(id: number) {
      console.log('eliminar');
      this.userService.deleteUser(id).subscribe({
        next: (response) => {
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        },
        complete: () => {
          console.log("Cuenta eliminada")
          this.router.navigateByUrl("/login")
        },
      });
    }

  }

