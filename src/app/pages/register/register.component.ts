import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../utils/services/auth.service';
import { TokenStorageService } from '../../utils/services/TokenStorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'register-page');
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      retypePassword: new FormControl(null, Validators.required),
    });
  }

  register() {
    const val = this.registerForm.value;

    if (this.registerForm.valid) {
      if (val.password !== val.retypePassword) {
        this.toastr.error('Password and Retype Password not same!');
        return;
      }

      this.authService
        .register(val.username, val.password, val.email)
        .subscribe(
          (res) => {
            if (res.Result.Status) {
              this.router.navigate(['/login']).then(() => {
                this.toastr.success(
                  'Registration successful. Please login with your account.'
                );
              });
            } else {
              this.toastr.error(res.Result.Message);
            }
          },
          (err) => {
            this.toastr.error(err.statusText);
          }
        );
    } else {
      this.toastr.error('Invalid value entered!');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
  }
}
