import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  constructor(private http:HttpClient) { }

  getVideos(url: any) {
    return this.http.get(`https://vimeo.com/${url}`);

    //https://api.vimeo.com/users/{user_id}/videos
}

}
