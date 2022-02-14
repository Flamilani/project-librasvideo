import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GENRES, MOVIES } from './data/db-data';

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

    const genresCollection = this.db.collection('genres');
    for (let genre of Object.values(GENRES)) {
      const newGenre = this.removeId(genre);
      const genreRef = await genresCollection.add(newGenre);
      console.log("carregando genres");
    }
  }

  removeId(data: any) {
    const newData: any = {...data};
    delete newData.id;
    return newData;
}
}
