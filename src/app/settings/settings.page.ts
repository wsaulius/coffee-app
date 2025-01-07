import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, RotateCcw, Check } from 'lucide-angular';
import { IonContent, ModalController, IonHeader, IonTitle, IonInput, IonToggle, IonListHeader, IonLabel, IonList, IonItem, IonFab, IonToolbar, IonButtons, IonButton, IonFabButton } from '@ionic/angular/standalone';
import { AppStorageService } from '../app-storage.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { API_ENDPOINT, API_KEY, MUSIC_OPTION } from '../app.constants';
import { environment } from 'src/environments/environment';
import { AudioService } from 'src/audio/audio.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonListHeader, IonLabel, IonList, IonToggle, IonButtons, FormsModule, IonItem, IonInput, IonToolbar, IonButton, CommonModule, LucideAngularModule, IonFab, IonFabButton]
})
export class SettingsPage {
  readonly X: LucideIconData = X;
  readonly RotateCcw: LucideIconData = RotateCcw;
  readonly applyChanges: LucideIconData = Check;
  
  apiEndpoint : String = "";
  apiKey : String = "";

  music: boolean = false;

  constructor(
    private appStorage: AppStorageService,
    private modalCtrl: ModalController,
    private audioService: AudioService,
  ) { 
    appStorage.get(API_ENDPOINT).then((value: string) => {
      this.apiEndpoint = value;
    });
    appStorage.get(API_KEY).then((value: string) => {
      this.apiKey = value;
    });
    appStorage.get(MUSIC_OPTION).then((value: boolean) => {
      this.music = value;
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  apply() {
    this.appStorage.set(API_ENDPOINT, this.apiEndpoint);
    this.appStorage.set(API_KEY, this.apiKey);
    this.appStorage.set(MUSIC_OPTION, this.music);
    if(this.music === true) {
      this.audioService.playAudio();
    } else {
      this.audioService.stopAudio();
    }
    return this.modalCtrl.dismiss(null, 'apply');
  }

  reset() {
    this.appStorage.get(API_ENDPOINT).then((value) => {
      this.apiEndpoint = environment.apiUrl;
    });
  }

}
