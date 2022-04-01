import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { REGISTER_VIEW_DATA } from './constants/register.constant';
import { RegisterViewContent, RegisterViewData, RegisterViewFooter, RegisterViewHeader } from './interface/login.interface';
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

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  celular: string = '';

  errorMessage: boolean = false;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  buildForm(): void {
    this.formRegister = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      celular: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  get viewHeader(): RegisterViewHeader {
    return this.registerViewData.header;
  }

  get viewContent(): RegisterViewContent {
    return this.registerViewData.content;
  }

  get viewFooter(): RegisterViewFooter {
    return this.registerViewData.footer;
  }

  cadastrar() {
    try {
      this.authService.registerUser({
        email: this.formRegister.value.email,
        password: this.formRegister.value.password,
        admin: false
      });
    } catch (error) {
      console.log(error);
    }
  }

  navigate() {
    this.router.navigateByUrl('home/login');
  }


}
