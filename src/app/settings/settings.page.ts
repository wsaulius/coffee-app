import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, RotateCcw, Check } from 'lucide-angular';
import { IonContent, ModalController, IonHeader, IonTitle, IonInput, IonListHeader, IonLabel, IonList, IonItem, IonFab, IonToolbar, IonButtons, IonButton, IonFabButton } from '@ionic/angular/standalone';
import { AppStorageService } from '../app-storage.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { API_ENDPOINT, API_KEY } from '../app.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonListHeader, IonLabel, IonList, IonButtons, FormsModule, IonItem, IonInput, IonToolbar, IonButton, CommonModule, LucideAngularModule, IonFab, IonFabButton]
})
export class SettingsPage {
  readonly X: LucideIconData = X;
  readonly RotateCcw: LucideIconData = RotateCcw;
  readonly applyChanges: LucideIconData = Check;
  
  apiEndpoint : String = "";
  apiKey : String = "";

  constructor(
    private appStorage: AppStorageService,
    private modalCtrl: ModalController,
  ) { 
    appStorage.get(API_ENDPOINT).then((value) => {
      this.apiEndpoint = value;
    });
    appStorage.get(API_KEY).then((value) => {
      this.apiKey = value;
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  apply() {
    this.appStorage.set(API_ENDPOINT, this.apiEndpoint);
    this.appStorage.set(API_KEY, this.apiKey);
    return this.modalCtrl.dismiss(null, 'apply');
  }

  reset() {
    this.appStorage.get(API_ENDPOINT).then((value) => {
      this.apiEndpoint = environment.apiUrl;
    });
  }

}
