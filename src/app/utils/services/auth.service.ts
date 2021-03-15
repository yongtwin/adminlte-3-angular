import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginDto } from '../../models/Dtos/UserLoginDto';
import { UserRegisterDto } from '../../models/Dtos/UserRegisterDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = null;
  public userLoggedIn = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<UserLoginDto>(
      environment.medicalAppApi + '/Authentication/login',
      { username, password },
      this.httpOptions
    );
  }

  register(username: string, password: string, email: string) {
    return this.http.post<UserRegisterDto>(
      environment.medicalAppApi + '/Authentication/register',
      { username, password, email },
      this.httpOptions
    );
  }
}
