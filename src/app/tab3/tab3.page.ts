import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, ModalController, IonItemGroup, IonSearchbar, IonItemDivider, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AppStorageService } from '../app-storage.service';
import { BEANS_FAVORITED, DRINKS_FAVORITED } from '../app.constants';
import { DetailPage } from '../detail/detail.page';
import { CoffeeBean } from '../model/bean';
import { CoffeeDrink } from '../model/drink';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItemGroup, IonSearchbar, IonItemDivider, IonItem, IonLabel],
})

export class Tab3Page {
  constructor(
    private modalCtrl: ModalController,
    private appStorage: AppStorageService,
  ) {}

  beans?: Array<CoffeeBean>;
  drinks?: Array<CoffeeDrink>;

  async ionViewDidEnter() {
    this.refreshView();
  }

  async refreshView() {
    this.beans = await this.appStorage.get(BEANS_FAVORITED);
    this.drinks = await this.appStorage.get(DRINKS_FAVORITED);
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

    if (role === "save") {
      this.refreshView();
    }
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

    if (role === "save") {
      this.refreshView();
    }
  }

}
