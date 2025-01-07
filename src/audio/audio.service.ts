import { Injectable } from '@angular/core';
import { AppStorageService } from 'src/app/app-storage.service';
import { MUSIC_OPTION } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio = new Audio("/assets/sound/cafe-music.mp3");

  constructor(
    private appStorageService: AppStorageService,
  ) { this.init(); }
  
  async init() {
    const music = await this.appStorageService.get(MUSIC_OPTION);
    if(music) {
      this.playAudio();
    } else {
      this.stopAudio();
    }
  }

  public playAudio() {
    this.audio.load();
    this.audio.loop = true;
    this.audio.play();
  }

  public stopAudio() {
    this.audio.pause();
  }
}
