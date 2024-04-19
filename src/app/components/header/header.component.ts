import { Component } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { RegisterService } from '../../services/auth/register.service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../interfaces/JwtPayload';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userLoginOn: boolean = false;
  userToken: string = "";
  userAdmin: boolean = false;
  admin?:boolean;
  constructor(private loginService:LoginService, private registerService:RegisterService){}




  ngOnInit(): void {
    //Login
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.loginService.currentToken.subscribe({
      next: (userToken:string) => {
        this.userToken = userToken;
      },
    });
    //Register
    this.registerService.currentToken.subscribe({
      next: (userToken:string) => {
        this.userToken = userToken;
      },
    });
    this.registerService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.loginService.currentUserAdmin.subscribe({
      next: (userAdmin) => {
        this.admin = userAdmin;
      }
    })

    const {authorities} = jwtDecode(this.userToken) as JwtPayload;
    if(authorities === 'ROLE_ADMIN'){
      this.admin = true;
    }else {
      this.admin = false;
    }
  }

  logout(){
    this.loginService.logout();
  }
}
