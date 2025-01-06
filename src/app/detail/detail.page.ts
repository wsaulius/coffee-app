import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Star, StarOff, Ellipsis } from 'lucide-angular';
import { IonContent, ModalController, IonHeader, IonTitle, IonModal, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonFab, IonToolbar, IonButtons, IonButton, IonFabButton } from '@ionic/angular/standalone';
import { CoffeeBeanDetail, CoffeeDrinkDetail } from '../model/api-responses';
import { AppStorageService } from '../app-storage.service';
import { CoffeeService } from '../api/coffee.service';
import { BEANS_FAVORITED, DRINKS_FAVORITED } from '../app.constants';
import { LucideIconData } from 'lucide-angular/icons/types';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonToolbar, IonButtons, IonButton, CommonModule, FormsModule, LucideAngularModule, IonFab, IonFabButton]
})
export class DetailPage {
  favoritedState: LucideIconData = Ellipsis;
  readonly X: LucideIconData = X;
  
  beanId?: number;
  drinkId?: number;
  bean?: CoffeeBeanDetail;
  drink?: CoffeeDrinkDetail;

  constructor(
    private appStorage: AppStorageService,
    private coffeeService: CoffeeService,
    private modalCtrl: ModalController,
  ) { }

  async ionViewDidEnter() {
    if(this.beanId) {
      this.coffeeService.getCoffeeBean(this.beanId).subscribe({
        next: async (data) => {
          this.bean = data;
          this.favoritedState = await this.setIcon();
        },
      });
    } else if (this.drinkId) {
      this.coffeeService.getCoffeeDrink(this.drinkId).subscribe({
        next: async (data) => {
          this.drink = data;
          this.favoritedState = await this.setIcon();
        },
      });
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

  async favorite() {
    var output: Array<any> = [];
    if(this.bean) {
      if (!Array.isArray(await this.appStorage.get(BEANS_FAVORITED))) {
        this.appStorage.set(BEANS_FAVORITED, new Array<CoffeeBeanDetail>);
      }

      if(await this.appStorage.contains(BEANS_FAVORITED, this.bean)) {
        this.appStorage.remove(BEANS_FAVORITED, this.bean);
      } else {
        this.appStorage.add(BEANS_FAVORITED, this.bean);
      }
    }
    else if (this.drink) {
      if (!Array.isArray(await this.appStorage.get(DRINKS_FAVORITED))) {
        this.appStorage.set(DRINKS_FAVORITED, new Array<CoffeeDrinkDetail>);
      }
      
      if(await this.appStorage.contains(DRINKS_FAVORITED, this.drink)) {
        this.appStorage.remove(DRINKS_FAVORITED, this.drink);
      } else {
        this.appStorage.add(DRINKS_FAVORITED, this.drink);
      }
    }
    this.favoritedState = await this.setIcon();
    return this.modalCtrl.dismiss(null, 'favorite-change');
  }

}
