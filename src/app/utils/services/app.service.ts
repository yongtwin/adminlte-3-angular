import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public user = {
    firstName: 'Alexander',
    lastName: 'Pierce',
    image: 'assets/img/user2-160x160.jpg',
  };

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string) {
    // return this.http.post<any>(environment.medicalAppApi + '/Authentication/login', { username, password }, this.httpOptions)
    return this.http
      .get<any>(environment.medicalAppApi + '/Result')
      .subscribe((res: any) => {
        localStorage.setItem('token', res.JwtToken);
        this.router.navigate(['/']);
      });
  }

  register() {
    localStorage.setItem('token', 'LOGGED_IN');
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
