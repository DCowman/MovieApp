import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Data } from '../services/data';

import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel,
     IonIcon, IonButtons, IonButton]
})
export class MovieDetailsPage implements OnInit {
  movieId: string = '';
  cast: any[] = [];
  crew: any[] = [];
  movie: any;


  constructor(private mds: Data, private route: ActivatedRoute) { }

  ngOnInit() {
      this.movieId = this.route.snapshot.paramMap.get('id')!;
      console.log("Movie id :", this.movieId);

      this.showMovieDescription();
      this.showMovieDetails();
  }

  showMovieDetails() {
    this.mds.getMovieCastCrew(this.movieId).subscribe((res: any) => {
      console.log('Cast & Crew :', res);
      this.cast = res.cast;
      this.crew = res.crew;
  });
  }

  showMovieDescription() {
    this.mds.getMovieDescription(this.movieId).subscribe((res: any) => {
      console.log('Movie Description :', res);
      this.movie = res;
  });
  }


}
