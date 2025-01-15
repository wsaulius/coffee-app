import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, RotateCcw, Check } from 'lucide-angular';
import { IonContent, ModalController, IonHeader, IonTitle, IonInput, IonToggle, IonListHeader, IonLabel, IonList, IonItem, IonFab, IonToolbar, IonButtons, IonButton, IonFabButton } from '@ionic/angular/standalone';
import { AppStorageService } from '../app-storage.service';
import { LucideIconData } from 'lucide-angular/icons/types';
import { API_ENDPOINT, API_KEY, MUSIC_OPTION, MOCK_DATA } from '../app.constants';
import { environment } from 'src/environments/environment';
import { AudioService } from 'src/audio/audio.service';
import { CoffeeService } from '../api/coffee.service';

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
  
  apiEndpoint : String | undefined = undefined;
  apiKey : String | undefined = undefined;

  music: boolean = false;
  mockData: boolean = false;

  constructor(
    private appStorage: AppStorageService,
    private modalCtrl: ModalController,
    private audioService: AudioService,
    private coffeeService: CoffeeService,
  ) { }
  
  async ionViewDidEnter() {
    this.apiEndpoint = await this.appStorage.get(API_ENDPOINT);
    this.apiKey = await this.appStorage.get(API_KEY);
    this.music = await this.appStorage.get(MUSIC_OPTION);
    this.mockData = await this.appStorage.get(MOCK_DATA);
    if(this.apiKey === null) {
      this.apiKey = await this.coffeeService.getKey();
    }
    if(this.apiEndpoint === null) {
      this.apiEndpoint = await this.coffeeService.getUrl();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async apply() {
    if ((await this.appStorage.get(MOCK_DATA) != this.mockData)) {
      await this.appStorage.clear();
    }
    await this.appStorage.set(API_ENDPOINT, this.apiEndpoint);
    await this.appStorage.set(API_KEY, this.apiKey);
    await this.appStorage.set(MUSIC_OPTION, this.music);
    await this.appStorage.set(MOCK_DATA, this.mockData);
    if(this.music === true) {
      this.audioService.playAudio();
    } else {
      this.audioService.stopAudio();
    }
    return this.modalCtrl.dismiss(null, 'apply');
  }

  reset() {
    this.apiEndpoint = environment.apiUrl;
  }

}
