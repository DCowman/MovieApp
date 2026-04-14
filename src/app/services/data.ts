import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})


export class Data {
    apiKey = '1a2b83d61edbd963a29a89ccaa57cec0';

    constructor(private storage: Storage, private http: HttpClient){
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

  searchMovies(keyword: string) { 
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${keyword}`);
  }

  getTrending() {
    return this.http.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}`);
  }

}
