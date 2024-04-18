import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from '../interfaces/JwtPayload';
@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }

   

  public decodeToken(){
    let token = sessionStorage.getItem('token') ?? ''
     return jwtDecode(token) as JwtPayload;
  }
}
