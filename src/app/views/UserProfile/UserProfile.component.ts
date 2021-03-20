import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './UserProfile.component.html',
  styleUrls: ['./UserProfile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public changePasswordForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      confirmNewPassword: new FormControl(null, Validators.required),
    });
  }

  changePassword() {
    const val = this.changePasswordForm.value;

    if (this.changePasswordForm.valid) {
      if (val.newPassword !== val.confirmNewPassword) {
        this.toastr.error('New Password and Confirm New Password not same!');
        return;
      }

      this.authService
        .changePassword(
          val.currentPassword,
          val.newPassword,
          val.confirmNewPassword
        )
        .subscribe(
          (res) => {
            if (res.result.status) {
              this.router.navigate(['/login']).then(() => {
                this.toastr.success(
                  'Change password successful. Please login again with your account.'
                );
              });
            } else {
              this.toastr.error(res.result.message);
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
}
