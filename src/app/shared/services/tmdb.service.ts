import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private httpClient: HttpClient) { }

  private trendingMovies: any[] = [];
	private trendingShows: any[] = [];
	private moviesGenresList: any[] = [];
	private topRatedMovies: any[] = [];
	private api: any = {
		key: '415cf44867fda717d3a05fafa42dadb1',
		url: 'https://api.themoviedb.org/3/',
		posters: 'https://image.tmdb.org/t/p/original',
		trendingMoviesUrl: 'https://api.themoviedb.org/3/trending/movie/week?api_key=',
		trendingShowsUrl: 'https://api.themoviedb.org/3/trending/tv/week?api_key=',
		moviesGenresUrl: 'https://api.themoviedb.org/3/genre/movie/list?api_key=',
		topRatedMoviesUrl: 'https://api.themoviedb.org/3/movie/top_rated?api_key='
	}

	ngOnInit(): void {
		this.getTrendingMovies();
		this.getMoviesGenresList();
		this.getTopRatedMovies();
	}

	moviesGenresListSubject = new Subject<any[]>();
	emitMoviesGenresListSubject(){
		this.moviesGenresListSubject.next(this.moviesGenresList)
	}
	getMoviesGenresList(): void{
		this.httpClient
		.get<any[]>(this.api.moviesGenresUrl + this.api.key)
		.subscribe(
			(response: any)=>{
				this.moviesGenresList = response;
				console.log('Fetch genres from API', this.moviesGenresList);
				this.emitMoviesGenresListSubject();
			},
			(error)=>{ console.log('Error !' + error)}
		)
	}

	trendingMoviesSubject = new Subject<any[]>();
	emitTrendingMoviesSubject(){
		this.trendingMoviesSubject.next(this.trendingMovies)
	}
	getTrendingMovies(){
		this.httpClient
		.get<any[]>(this.api.trendingMoviesUrl + this.api.key)
		.subscribe(
			(response: any)=>{
				this.trendingMovies = Object.values(response.results);
				console.log('Fetch movies from API', this.trendingMovies);
				this.emitTrendingMoviesSubject();
			},
			(error)=>{ console.log('Error !' + error)}
		)
	}


	trendingShowsSubject = new Subject<any[]>();
	emitTrendingShowsSubject(){
		this.trendingShowsSubject.next(this.trendingShows)
	}
	getTrendingShows(){
		this.httpClient
		.get<any[]>(this.api.trendingShowsUrl + this.api.key)
		.subscribe(
			(response: any)=>{
				this.trendingShows = Object.values(response.results);
				console.log('Fetch shows from API', this.trendingShows);
				this.emitTrendingShowsSubject();
			},
			(error)=>{ console.log('Error !' + error)}
		)
	}

	topRatedMoviesSubject = new Subject<any[]>();
	emitTopRatedMoviesSubject(){
		this.topRatedMoviesSubject.next(this.topRatedMovies)
	}
	getTopRatedMovies(){
		this.httpClient
		.get<any[]>(this.api.topRatedMoviesUrl + this.api.key)
		.subscribe(
			(response: any)=>{
				this.topRatedMovies = Object.values(response.results);
				console.log('Fetch top rated movies from API', this.topRatedMovies);
				this.emitTopRatedMoviesSubject();
			},
			(error)=>{ console.log('Error top rated movies!' + error)}
		)
	}
}
