import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { RouterModule } from '@angular/router';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel,
     IonIcon, IonButtons, IonButton, RouterModule]
})
export class MovieDetailsPage implements OnInit {
  movieId: string = '';
  cast: any[] = [];
  crew: any[] = [];
  movie: any;

  isItFavourite: boolean = false;



  constructor(private mds: Data, private route: ActivatedRoute) { }

  ngOnInit() {
      this.movieId = this.route.snapshot.paramMap.get('id')!;
      console.log("Movie id :", this.movieId);

      this.showMovieDescription();
      this.showMovieDetails();
      this.checkFavourite();
  }

  async showMovieDetails() {
    let res = await this.mds.getMovieCastCrew(this.movieId);
      console.log('Cast & Crew :', res);
      this.cast = res.cast;
      this.crew = res.crew;
  }
  

  async showMovieDescription() {
    let res = await this.mds.getMovieDescription(this.movieId);
      console.log('Movie Description :', res);
      this.movie = res;
  }

  //Simple check to see if the movie is in favourites
  async checkFavourite() {
    let favourites = await this.mds.get('favourites');
    
    //Makes sure the array exists. Wont work if favourites is null
    if (!favourites) {
      favourites = [];
    }
  
    this.isItFavourite = favourites.includes(this.movieId);
}

  // if isItFavourite == true, removes the movie from favourites by building a new array using filter(),
  // keeping only the IDs that arent equal to this.movieId. Else add to favourites. Finally save the new favourites array
  async toggleFavourite() {
    let favourites = await this.mds.get('favourites');

    // makes sure the array exists. Wont work if favourites is null
    if (!favourites) {
      favourites = [];
    }

    if (this.isItFavourite) {
      favourites = favourites.filter((id: string) => id !== this.movieId);
      this.isItFavourite = false;
    } else {
        favourites.push(this.movieId);
        this.isItFavourite = true;
      }

    await this.mds.set('favourites', favourites);
  }


}
