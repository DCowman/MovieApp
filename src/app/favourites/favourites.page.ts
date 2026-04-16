import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    RouterModule, IonIcon, IonButtons]
})
export class FavouritesPage implements OnInit {
  movies: any[] = [];


  constructor(private mds: Data) { }

  ngOnInit() {
    this.showFavourites();
  }

  // Loads all favourite movies from storage & clears the current movies array to avoid duplication.
  // Then grabs each movies and adds them to the movies array to display  
  async showFavourites() {
    let favourites = await this.mds.get('favourites');

    if (!favourites) {
      favourites = [];
    }
    
    this.movies = [];
    for (let i = 0; i < favourites.length; i++) {
      let res = await this.mds.getMovieDescription(favourites[i]);
      this.movies.push(res);
      }
    
  }

}
