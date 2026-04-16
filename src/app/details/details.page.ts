import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonList, IonItem, IonLabel, IonText } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../services/data';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonButtons, IonButton, IonIcon, IonCard, IonCardContent,
    IonCardTitle, IonCardHeader, IonList, IonItem, IonLabel, RouterModule, IonText]
})
export class DetailsPage implements OnInit {
  id: string = '';
  person: any = {};
  movies: any[] = [];


  constructor(private route: ActivatedRoute, private mds: Data) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.showPerson();
    this.showMovies();
  }

  async showPerson() {
    this.person = await this.mds.getPersonsDetails(this.id);
  }

  async showMovies() {
    const res: any = await this.mds.getPersonsMovies(this.id);
    this.movies = res.cast || res.crew;
  }

}
