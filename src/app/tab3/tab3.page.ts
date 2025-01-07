import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, ModalController, IonItemGroup, IonSearchbar, IonItemDivider, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AppStorageService } from '../app-storage.service';
import { BEANS_FAVORITED, DRINKS_FAVORITED } from '../app.constants';
import { DetailPage } from '../detail/detail.page';
import { CoffeeBean } from '../model/bean';
import { CoffeeDrink } from '../model/drink';
import { LucideAngularModule, Settings } from 'lucide-angular';
import { SettingsPage } from '../settings/settings.page';
import { FilterPipe } from '../filter.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, FilterPipe, FormsModule, IonItemGroup, IonSearchbar, IonItemDivider, IonButton, IonItem, IonLabel, LucideAngularModule],
})

export class Tab3Page {
  constructor(
    private modalCtrl: ModalController,
    private appStorage: AppStorageService,
  ) {}
  readonly settingsIcon = Settings
  searchText: string = "";


  beans: Array<CoffeeBean> = [];
  drinks: Array<CoffeeDrink> = [];

  async ionViewDidEnter() {
    const beans = await this.appStorage.get(BEANS_FAVORITED);
    const drinks = await this.appStorage.get(DRINKS_FAVORITED);
    this.updateView(beans, drinks);
  }

  updateView(beans: Array<CoffeeBean>, drinks: Array<CoffeeDrink>) {
    this.beans = beans;
    this.drinks = drinks;
  }

  async showBeanDetail(bean: CoffeeBean) {
    const modal = await this.modalCtrl.create({
      component: DetailPage,
      componentProps: {
        bean: bean
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if(role !== 'cancel'){
      this.updateView(data, this.drinks);
    }

  }

  async openSettings() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

  }

  async showDrinkDetail(drink: CoffeeDrink) {
    const modal = await this.modalCtrl.create({
      component: DetailPage,
      componentProps: {
        drink: drink
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if(role !== 'cancel') {
      this.updateView(this.beans, data);
    }
  }

}
