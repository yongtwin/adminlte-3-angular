import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginDto } from '../../models/Dtos/UserLoginDto';
import { UserRegisterDto } from '../../models/Dtos/UserRegisterDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user = {
    firstName: 'Alexander',
    lastName: 'Pierce',
    image: 'assets/img/user2-160x160.jpg',
  };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<UserLoginDto>(
      environment.medicalAppApi + '/Authentication/login',
      { username, password },
      this.httpOptions
    );
    // return this.http.get<UserDto>(environment.medicalAppApi + '/Result');//, this.httpOptions)
  }

  register(username: string, password: string, email: string) {
    // return this.http.get<UserLoginDto>(environment.medicalAppApi + '/Response');//, this.httpOptions)
    return this.http.post<UserRegisterDto>(
      environment.medicalAppApi + '/Authentication/register',
      { username, password, email },
      this.httpOptions
    );
  }
}
