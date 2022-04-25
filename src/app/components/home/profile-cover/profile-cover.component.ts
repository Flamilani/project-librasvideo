import { User } from './../../../shared/models/user';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap, last, tap } from 'rxjs/operators';
import { UserService } from './../../../shared/services/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-profile-cover',
  templateUrl: './profile-cover.component.html',
  styleUrls: ['./profile-cover.component.scss']
})
export class ProfileCoverComponent implements OnInit {

  user!: User | null;

  users: any;

  profileId: any;

  percentageChanges$: Observable<any> | undefined;

  photoURL!: string;

  formProfile = this.fb.group({
    photoURL: [null]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.profileId = this.afs.createId();

    this.loadUser();
  }

  loadUser() {
    this.afAuth.authState.subscribe((user) => {
    this.userService.getProfile(user?.uid).subscribe((user) => {
      this.users = user;
      this.profileId = user?.uid;
      console.log(this.users);
      console.log(this.profileId);
    });
  });
  }

  uploadImage(event: any) {
    const file: File = event.target.files[0];

    const filePath = `users/${this.profileId}/${file.name}`;

    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });

    this.afAuth.authState.subscribe((user) => {
      this.userService.getProfile(user?.uid).subscribe((user) => {
        this.users = user;
        this.profileId = user?.uid;
      });
    });

    console.log(this.users.photoURL);

/*      if (this.users.photoURL ! == null) {
      this.storage.storage.refFromURL(this.users.photoURL).delete();
    } */

    this.percentageChanges$ = task.percentageChanges();

    task.snapshotChanges()
    .pipe(last(),
      concatMap(() => this.storage.ref(filePath).getDownloadURL()),
      tap(url => this.photoURL = url),
      tap(url => this.formProfile.get('photoURL')?.setValue(url)),
      catchError(err => {
        alert("Could not create thumbnail url.");
        return throwError(err);
      })
    ).subscribe();
  }

  updateCover() {
    const changes = this.formProfile.value;

    this.afAuth.authState.subscribe((user) => {
      this.userService.getProfile(user?.uid).subscribe((user) => {
        this.users = user;
        this.profileId = user?.uid;
        console.log(this.users);
        console.log('profileId', this.profileId);
      });
    });
/*
    if (this.users.photoURL ! == null) {
    this.storage.storage.refFromURL(this.users!.photoURL).delete();
    }
 */
    this.userService.updateCover(this.profileId, changes)
      .subscribe(() => {
        console.log('perfil foto atualizado');
        this.router.navigate(['home/perfil']);
      });

  }

}
