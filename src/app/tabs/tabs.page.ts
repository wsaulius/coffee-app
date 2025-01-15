import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { LucideAngularModule, Coffee, Star } from 'lucide-angular';
import { coffeeBean } from '@lucide/lab';
import { AudioService } from 'src/audio/audio.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, LucideAngularModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  readonly Coffee = Coffee;
  readonly coffeeBean = coffeeBean;
  readonly Star = Star;

  constructor(audioService: AudioService) {}
}
