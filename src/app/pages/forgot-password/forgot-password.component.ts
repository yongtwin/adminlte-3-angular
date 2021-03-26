import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public isAuthLoading = false;
  public showNewPassword = false;
  public newPassword = '';

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.forgotPasswordForm = new FormGroup({
      username: new FormControl(null, Validators.required),
    });
  }

  forgotPassword() {
    const val = this.forgotPasswordForm.value;

    if (this.forgotPasswordForm.valid) {
      this.authService.resetPassword(val.username).subscribe(
        (res) => {
          if (res.result.status) {
            this.showNewPassword = true;
            this.newPassword = res.result.newPassword;
          } else {
            this.toastr.error('Reset password failed!');
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

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }
}
