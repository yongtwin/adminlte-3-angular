import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../utils/services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../utils/services/TokenStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    const val = this.loginForm.value;

    if (this.loginForm.valid) {
      this.authService.login(val.email, val.password).subscribe(
        (res) => {
          if (res.Result.status) {
            this.tokenStorageService.saveToken(res.Result.JwtToken);
            this.router.navigate(['/']);
          } else {
            this.toastr.error('Wrong email or password!');
          }
        },
        (err) => {
          this.toastr.error(err.statusText);
        }
      );
    } else {
      this.toastr.error('Invalid email or password!');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
