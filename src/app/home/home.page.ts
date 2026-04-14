import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { Data } from '../services/data';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle],
  })

export class HomePage {
  newSearch:string = "";
  keywordToSearch:string ="";

  constructor(private mds:Data, private router: Router) {}

  ngOnInit() {
    
  }

  async setKeyword(){
    await this.mds.set("keyword", this.newSearch);
    this.keywordToSearch = this.newSearch;
    this.router.navigate(['/movies']);
  }
}
