import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../../shared/models/user';
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  user!: User;
  profileId: any;
  users: any;

  public providerId: string = 'null';

  formProfile = this.fb.group({
    email: ['', Validators.required],
    displayName: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    const val = this.formProfile.value;

    this.formProfile = this.fb.group({
      email: [val.email, Validators.required],
      displayName: [val.displayName, Validators.required],
      phoneNumber: [val.phoneNumber, Validators.required]
    });
  }

  ngOnInit(): void {
 //   this.profileId = this.authService.userData;
    this.loadUser();
  }

  loadUser() {
    this.afAuth.authState.subscribe((user) => {
      this.users = user;
      this.profileId = user?.uid;
      console.log(this.users);
      console.log('profileId', this.profileId);
    });

  }

   onSubmit() {
    this.afAuth.authState.subscribe((user) => {
      this.users = user;
      this.profileId = user?.uid;
      console.log(this.users);
      console.log('profileId', this.profileId);

      const changes = this.formProfile.value;

      console.log(this.profileId);
      this.authService.updateProfile(this.profileId, changes)
        .subscribe(() => {
          console.log('perfil atualizado');
          this.router.navigate(['home/perfil']);
        });
    });


  }

}
