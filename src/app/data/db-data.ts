export const MOVIES: any = {
  1: {
    "id": 2,
    "title": "Godzilla",
    "director": "Adam",
    "genres": "acao",
    "year": 2020,
    "url": "",
    "iconUrl": "https://image.tmdb.org/t/p/original/4MXfPlVS5aY6FJlJ5Y0qXsPnNcy.jpg"
  },
  2: {
    "title": "Superman",
    "director": "Diretor",
    "year": "1995",
    "genres": "aventura",
    "id": 3,
    "url": "",
    "iconUrl": "https://image.tmdb.org/t/p/original/nSNle6UJNNuEbglNvXt67m1a1Yn.jpg"
  },
  3: {
    "title": "Nome do Filme",
    "director": "Nome do Diretor",
    "year": "2021",
    "genres": "aventura",
    "id": 4,
    "url": "",
    "iconUrl": "https://image.tmdb.org/t/p/original/rJwiDSoKI3ryiLTZZ6BPUl2CrwG.jpg"
  },
  4: {
    "title": "teste",
    "director": "diretor",
    "genres": "comedia",
    "year": "2022",
    "id": 5,
    "url": "",
    "iconUrl": "https://image.tmdb.org/t/p/original/4gaUbCInKAJOsCgjg8vcNn0A7jn.jpg"
  }
}
export const SERIES: any = {
  1: {
    "id": 1,
    "title": "Stranger Things",
    "director": "Zack",
    "genres": 2,
    "year": 2021
  },
  2: {
    "id": 2,
    "title": "Detetive",
    "director": "Adam",
    "genres": 1,
    "year": 2020
  },
  3: {
    "id": 3,
    "title": "Itaiwem Class",
    "director": "Jack",
    "genres": 3,
    "year": 2021
  }
}

export const GENRES = {
  1: {
    id: 1,
    name: "acao",
    active: true
  },
  2: {
    id: 2,
    name: "aventura",
    active: true
  },
  3: {
    id: 3,
    name: "comedia",
    active: true
  },
  4: {
    id: 4,
    name: "documentario",
    active: true
  },
  5: {
    id: 5,
    name: "romance",
    active: true
  },
  6: {
    id: 6,
    name: "drama",
    active: true
  }
};

export const USERS = {
  1: {
    id: 1,
    email: 'flaviomilani83@gmail.com',
    password: 'teste1'
  }
};

export function findMovieById(movieId: number) {
  return MOVIES[movieId];
}

export function authenticate(email: string, password: string) {
  const user: any = Object.values(USERS).find(user => user.email === email);

  if (user && user.password == password) {
    return user;
  } else {
    return undefined;
  }

}
