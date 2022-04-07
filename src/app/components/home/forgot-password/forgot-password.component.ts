import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { FORGOT_VIEW_DATA } from './constant/forgot-password.constant';
import { ForgotViewContent, ForgotViewData, ForgotViewFooter, ForgotViewHeader } from './interface/forgot-password.interface';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  readonly forgotViewData: ForgotViewData = FORGOT_VIEW_DATA;

  @ViewChild('email') inputEmail: any;
  @ViewChild('btnSend') btnSend: any;

  form!: FormGroup;
  sendMessage: boolean = false;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  get viewHeader(): ForgotViewHeader {
    return this.forgotViewData.header;
  }

  get viewContentEmail(): ForgotViewContent {
    return this.forgotViewData.content[0];
  }

  get viewFooter(): ForgotViewFooter {
    return this.forgotViewData.footer;
  }

  onSend() {
    this.inputEmail.nativeElement.value = '';
    this.btnSend.nativeElement.disabled = true;
/*     this.authService.forgotPassword(this.form.value.email)
      .then(() => {
      this.sendMessage = true;
      this.form.value.email.reset()
    }).catch((err) => {
      this.sendMessage = false;
    }); */
  }

  navigate() {
    this.router.navigateByUrl('home/login');
  }

}
