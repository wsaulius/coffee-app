import { Component } from '@angular/core';
import { IonModal, IonButtons, IonFabButton, IonFab, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonSearchbar, IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
import { LucideAngularModule, X, Star, StarOff } from 'lucide-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, LucideAngularModule, IonFabButton, IonFab, IonModal, IonButton, IonButtons, IonToolbar, IonTitle, IonContent, IonList, IonSearchbar, IonItem, IonLabel, IonThumbnail]
})
export class Tab2Page {
  readonly Star = Star;
  readonly StarOff = StarOff;
  readonly X = X;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
