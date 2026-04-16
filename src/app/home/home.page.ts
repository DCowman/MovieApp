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
    let res = await this.mds.getTrending();
    this.movies = res.results;
  }



  async setKeyword(){
    this.mds.set("keyword", this.newSearch);
    //display this later. Maybe remove?
    this.keywordToSearch = this.newSearch;

    if (!this.newSearch) {
      this.showTrending();
    } else {
    let res = await this.mds.searchMovies(this.newSearch);
    this.movies = res.results;
  }
}
}
