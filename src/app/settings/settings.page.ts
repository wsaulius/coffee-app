import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { IonContent, ModalController, IonHeader, IonTitle, IonModal, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonFab, IonToolbar, IonButtons, IonButton, IonFabButton } from '@ionic/angular/standalone';
import { AppStorageService } from '../app-storage.service';
import { LucideIconData } from 'lucide-angular/icons/types';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonToolbar, IonButtons, IonButton, CommonModule, FormsModule, LucideAngularModule, IonFab, IonFabButton]
})
export class SettingsPage {
  readonly X: LucideIconData = X;
  
  constructor(
    private appStorage: AppStorageService,
    private modalCtrl: ModalController,
  ) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
