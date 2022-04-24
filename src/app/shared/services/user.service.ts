import { User } from './../models/user';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  moviesCollection!: AngularFirestoreCollection<User>;
  movieDoc!: AngularFirestoreDocument<User>;
  movie!: Observable<User | null>;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone,
    ) { }

    getProfile(id: any) {
      this.movieDoc = this.db.doc<User>(`users/${id}`);
      this.movie = this.movieDoc.snapshotChanges().pipe(
          map(action => {
            if (action.payload.exists === false) {
              return null
            } else {
              const data = action.payload.data() as User;
              data.uid = action.payload.id;
              return data;
            }
          }));

      return this.movie;
    }

    updateCover(id: string, changes: Partial<User>): Observable<any> {
      return from(this.db.doc(`users/${id}`).update(changes));
    }
}
