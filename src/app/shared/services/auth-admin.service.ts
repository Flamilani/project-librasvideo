import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthData } from '../auth/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  userData: any;
  user$!: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private ngZone: NgZone,
    private router: Router
    ) {
      this.userData = this.afAuth.authState.pipe(switchMap(user => {
        if (user) {
          return this.afs.doc<AuthData>(`usersrole/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
    }

    public currentUser: any;
    public userStatus!: string;
    public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

    setUserStatus(userStatus: any): void {
      this.userStatus = userStatus;
      this.userStatusChanges.next(userStatus);
    }

    signUp(email:string, password:string){
      this.afAuth.createUserWithEmailAndPassword(email, password)
       .then((userResponse: any)=>{
         // add the user to the "users" database
         let user = {
          id: userResponse.user.uid,
          username: userResponse.user.email,
          admin: true,
         }
         //add the user to the database
         this.afs.collection("usersrole").add(user)
         .then(user => {
          user.get().then(x => {
            //return the user data
            console.log(x.data());
            this.currentUser = x.data();
            this.setUserStatus(this.currentUser);
            this.router.navigate(["/admin"]);
          })
         }).catch(err => {
           console.log(err);
         })


       })
       .catch((err)=>{
          console.log("An error ocurred: ", err);
       })

      }

    login(email: string, password: string) {

      this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user: any)=>{
        this.afs.collection("usersrole").ref.where("username", "==", user.user.email).onSnapshot(snap =>{
          snap.forEach((userRef: any) => {
            console.log("userRef", userRef.data());
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser)
            if(userRef.data().admin !== true) {
              this.router.navigate(["/admin/login"]);
            }else{
              this.router.navigate(["/admin"]);
            }
          })
        })

      }).catch(err => err)
  }

  userChanges(){
    this.afAuth.onAuthStateChanged((currentUser: any) => {
      if(currentUser){
        this.afs.collection("usersrole").ref.where("username", "==", currentUser.email).onSnapshot(snap =>{
          snap.forEach((userRef: any) => {
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser);
            console.log(this.userStatus)

            if(userRef.data().admin !== true) {
              this.router.navigate(["/admin/login"]);
            }else{
             this.ngZone.run(() => this.router.navigate(["/admin"]));
            }
          })
        })
      }else{
        //this is the error you where looking at the video that I wasn't able to fix
        //the function is running on refresh so its checking if the user is logged in or not
        //hence the redirect to the login
        this.ngZone.run(() => this.router.navigate(["/admin/login"]));
      }
    })
  }

  logOut(){
    this.afAuth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      this.currentUser = null;
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["/admin/login"]));

    }).catch((err) => {
      console.log(err);
    })
  }
}
