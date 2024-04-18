import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from '../interfaces/JwtPayload';
@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }

  token = sessionStorage.getItem('token') ?? ''
   
  decodedToken = jwtDecode(this.token) as JwtPayload;

   getUsername(){
      return this.decodedToken.sub;
  }

  getId(){
    return this.decodedToken.id;
}
}
