import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CATEGORIES, MOVIES } from './data/db-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private db: AngularFirestore) {
  }

  async uploadData() {
    const moviesCollection = this.db.collection('movies');
    for (let movie of Object.values(MOVIES)) {
      const newMovie = this.removeId(movie);
      const movieRef = await moviesCollection.add(newMovie);
      console.log("carregando movies");
    }

  /*   const categoriesCollection = this.db.collection('categories');
    for (let category of Object.values(CATEGORIES)) {
      const newCategory = this.removeId(category);
      const categoryRef = await categoriesCollection.add(newCategory);
    } */
  }

  removeId(data: any) {
    const newData: any = {...data};
    delete newData.id;
    return newData;
}
}
