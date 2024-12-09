import { Component, ViewChild } from '@angular/core';
import { IonHeader, IonBackButton, IonCard, IonFab, IonCardHeader, IonButtons, IonButton, IonCardTitle, IonModal, IonSearchbar, IonCardContent, IonCardSubtitle, IonToolbar, IonFabButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { LucideAngularModule, X, Star, StarOff } from 'lucide-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonCard, IonBackButton, IonFab, IonCardHeader, IonSearchbar, IonModal, IonButtons, IonButton, IonCardContent, IonCardTitle, IonCardSubtitle, IonTitle, IonContent, IonFabButton, LucideAngularModule],
})
export class Tab1Page {
  readonly Star = Star;
  readonly StarOff = StarOff;
  readonly X = X;
  
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
