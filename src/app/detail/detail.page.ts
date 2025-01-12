import { Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Star, StarOff, Ellipsis } from 'lucide-angular';
import { IonContent, ModalController, IonHeader, IonTitle, IonModal, IonCardHeader, IonSpinner, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonFab, IonToolbar, IonButtons, IonButton, IonFabButton } from '@ionic/angular/standalone';
import { AppStorageService } from '../app-storage.service';
import { CoffeeService } from '../api/coffee.service';
import { BEANS_STORAGE, DRINKS_STORAGE, BEANS_FAVORITED, DRINKS_FAVORITED } from '../app.constants';
import { LucideIconData } from 'lucide-angular/icons/types';
import { CoffeeBean } from '../model/bean';
import { CoffeeDrink } from '../model/drink';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonModal, IonCard, IonCardHeader, IonSpinner, IonCardTitle, IonCardContent, IonCardSubtitle, IonToolbar, IonButtons, IonButton, CommonModule, FormsModule, LucideAngularModule, IonFab, IonFabButton]
})
export class DetailPage {
  favoritedState: LucideIconData = Ellipsis;
  readonly X: LucideIconData = X;
  
  beanId: number | undefined;
  drinkId: number | undefined;
  @Input() bean: CoffeeBean | null = null;
  @Input() drink: CoffeeDrink | null = null;

  constructor(
    private appStorage: AppStorageService,
    private coffeeService: CoffeeService,
    private modalCtrl: ModalController,
  ) { }

  async fetchBeanDetails(id: Number) {
    const data = await firstValueFrom(await this.coffeeService.getCoffeeBean(id));
    this.appStorage.add(BEANS_STORAGE, new CoffeeBean(id, data.name, data.description, data.roast, data.species, data.country_origin, data.country_roasted));
  }

  async fetchDrinkDetails(id: Number) {
    const data = await firstValueFrom(await this.coffeeService.getCoffeeDrink(id));
    this.appStorage.add(DRINKS_STORAGE, new CoffeeDrink(id, data.name, data.description, data.image_url, data.ingredients));
  }

  async getBean(beanId: Number){
    const cache : Array<CoffeeBean> | null = await this.appStorage.get(BEANS_STORAGE);
    if(cache !== null) {
      const cachedBean = cache.find((bean) => bean.id === beanId);
      if (cachedBean !== undefined) {
        return cachedBean;
      }
    }
    this.fetchBeanDetails(beanId);
    return null;
  }

  async getDrink(drinkId: Number){
    const cache : Array<CoffeeDrink> | null = await this.appStorage.get(DRINKS_STORAGE);
    if(cache !== null) {
      const cachedDrink = cache.find((drink) => drink.id === drinkId);
      if (cachedDrink !== undefined) {
        return cachedDrink;
      }
    }
    this.fetchDrinkDetails(drinkId);
    return null;
  }

  async ionViewDidEnter() { // TODO: speed this up!
    if(this.beanId !== undefined) {
      let result;
      do {
        result = await this.getBean(this.beanId);
      } while (result === null);
      this.bean = result;
    } else if (this.drinkId !== undefined) {
      let result;
      do {
        result = await this.getDrink(this.drinkId);
      } while (result === null);
      this.drink = result;
    }
    this.favoritedState = await this.setIcon();
  }

  async setIcon() {
    if(this.bean) {
      if (await this.appStorage.contains(BEANS_FAVORITED, this.bean)) {
        return StarOff;
      }
    } else if (this.drink) {
      if (await this.appStorage.contains(DRINKS_FAVORITED, this.drink)) {
        return StarOff;
      }
    }
    return Star;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async saveBean(bean: CoffeeBean) {
    let data;
    if(await this.appStorage.contains(BEANS_FAVORITED, bean)) {
      data = await this.appStorage.remove(BEANS_FAVORITED, bean);
    } else {
      data = await this.appStorage.add(BEANS_FAVORITED, bean);
    }
    return this.modalCtrl.dismiss(data, 'save');
  }

  async saveDrink(drink: CoffeeDrink) {
    let data;
    if(await this.appStorage.contains(DRINKS_FAVORITED, drink)) {
      data = await this.appStorage.remove(DRINKS_FAVORITED, drink);
    } else {
      data = await this.appStorage.add(DRINKS_FAVORITED, drink);
    }
    return this.modalCtrl.dismiss(data, 'save'); 
  }

}
