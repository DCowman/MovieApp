import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { MyHttp } from './my-http';

@Injectable({
  providedIn: 'root',
})


export class Data {
  apiKey = '1a2b83d61edbd963a29a89ccaa57cec0';

  constructor(private storage: Storage, private http: MyHttp){
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
  }

  async set(key:string, value:any){
    await this.storage.set(key,value);
  }

  async get(key:string){
    return await this.storage.get(key);
  }

  async searchMovies(keyword: string) { 
    return await this.http.get('https://api.themoviedb.org/3/trending/movie/day', {api_key: this.apiKey, query: keyword});
  }

  async getTrending() {
    return await this.http.get('https://api.themoviedb.org/3/trending/movie/day', { api_key: this.apiKey });
  }

  async getMovieCastCrew(id: string) {
    return await this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits`, { api_key: this.apiKey });
  }

  async getMovieDescription(id: string) {
    return await this.http.get(`https://api.themoviedb.org/3/movie/${id}`, { api_key: this.apiKey });
  }

}
