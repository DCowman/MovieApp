import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButtons, IonIcon, IonCardContent } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton,
     FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButtons, 
     IonIcon, RouterModule, IonCardContent,CommonModule],
  })

export class HomePage {
  newSearch:string = "";
  keywordToSearch:string ="";

  constructor(private mds:Data, private router: Router) {}

  movies: any[] = [];

  ngOnInit() {
    this.showTrending();
  }

  async showTrending() {
    const res = await this.mds.getTrending();
    this.movies = res.results;
  }


  // Checks if a search string was entered. If empty simply reload trending movies.
  // Otherwise sends the search keyword to searchMovies and saves the result to the movies array
  async setKeyword(){
    console.log("setKeyword called");
    await this.mds.set("keyword", this.newSearch);
  
    if (!this.newSearch) {
      await this.showTrending();
    } else {
        const res: any = await this.mds.searchMovies(this.newSearch);
        console.log('movies BEFORE:', this.movies);
        this.movies = res.results; 
        console.log('movies AFTER:', this.movies)
  }
}
}
