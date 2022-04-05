import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { REGISTER_VIEW_DATA } from './constants/register.constant';
import { RegisterViewContent, RegisterViewData, RegisterViewFooter, RegisterViewHeader } from './interface/register.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  readonly registerViewData: RegisterViewData = REGISTER_VIEW_DATA;

  formRegister!: FormGroup;

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  errorMessage: boolean = false;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  buildForm(): void {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required], Validators.maxLength(0)],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  get viewHeader(): RegisterViewHeader {
    return this.registerViewData.header;
  }

  get viewContentName(): RegisterViewContent {
    return this.registerViewData.content[0];
  }

  get viewContentCelular(): RegisterViewContent {
    return this.registerViewData.content[1];
  }

  get viewContentEmail(): RegisterViewContent {
    return this.registerViewData.content[2];
  }

  get viewContentSenha(): RegisterViewContent {
    return this.registerViewData.content[3];
  }

  get viewContentConfSenha(): RegisterViewContent {
    return this.registerViewData.content[4];
  }

  get viewFooterCadastrar(): RegisterViewFooter {
    return this.registerViewData.footer[0];
  }

  get viewFooterLogar(): RegisterViewFooter {
    return this.registerViewData.footer[1];
  }

  cadastrar() {
      this.authService.signUp({
        email: this.formRegister.value.email,
        password: this.formRegister.value.confirmPassword,
        admin: false
      }).then(result => {
        this.authService.setUserData(result.user);
        this.authService.authPayment();
      }).catch((err) => {
        this.errorMessage = true;
      });
  }

  navigate() {
    this.router.navigateByUrl('home/login');
  }


}

export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
