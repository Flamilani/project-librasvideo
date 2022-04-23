export const MOVIES: any = {
  1: {
    id: 1,
    seqNo: 0,
    title: "Godzilla",
    director: "Adam",
    category: 'ACTION',
    description: "",
    year: 2020,
    age: 0,
    url: "",
    iconUrl: "https://image.tmdb.org/t/p/original/4MXfPlVS5aY6FJlJ5Y0qXsPnNcy.jpg",
    active: true
  },
  2: {
    id: 2,
    seqNo: 1,
    title: "Superman",
    director: "Diretor",
    category: 'ADVENTURE',
    description: "",
    year: "1995",
    age: 10,
    url: "",
    iconUrl: "https://image.tmdb.org/t/p/original/nSNle6UJNNuEbglNvXt67m1a1Yn.jpg",
    active: true
  },
  3: {
    id: 3,
    seqNo: 2,
    title: "Nome do Filme",
    director: "Nome do Diretor",
    category: 'DRAMA',
    description: "",
    year: "2021",
    age: 12,
    url: "",
    iconUrl: "https://image.tmdb.org/t/p/original/rJwiDSoKI3ryiLTZZ6BPUl2CrwG.jpg",
    active: true
  },
  4: {
    id: 4,
    seqNo: 3,
    title: "teste",
    director: "diretor",
    category: 'ACTION',
    description: "",
    year: "2022",
    age: 12,
    url: "",
    iconUrl: "https://image.tmdb.org/t/p/original/4gaUbCInKAJOsCgjg8vcNn0A7jn.jpg",
    active: true
  }
}
export const SERIES: any = {
  1: {
    "id": 1,
    "title": "Stranger Things",
    "director": "Zack",
    "genre": 2,
    "year": 2021
  },
  2: {
    "id": 2,
    "title": "Detetive",
    "director": "Adam",
    "genre": 1,
    "year": 2020
  },
  3: {
    "id": 3,
    "title": "Itaiwem Class",
    "director": "Jack",
    "genre": 3,
    "year": 2021
  }
}

export const MOVIES_FAVORITES = {
  1: {
    id: 1,
    uid: ''
  }
}

export const CATEGORIES = {
  1: {
    id: 1,
    'seqNo': 0,
    name: "Ação",
    active: true
  },
  2: {
    id: 2,
    'seqNo': 1,
    name: "Aventura",
    active: true
  },
  3: {
    id: 3,
    'seqNo': 2,
    name: "Comédia",
    active: true
  },
  4: {
    id: 4,
    'seqNo': 3,
    name: "documentario",
    active: true
  },
  5: {
    id: 5,
    'seqNo': 4,
    name: "romance",
    active: true
  },
  6: {
    id: 6,
    'seqNo': 5,
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
