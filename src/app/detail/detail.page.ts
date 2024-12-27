import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Star, StarOff } from 'lucide-angular';
import { IonContent, ModalController, IonHeader, IonTitle, IonModal, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, IonFab, IonToolbar, IonButtons, IonButton, IonFabButton } from '@ionic/angular/standalone';
import { CoffeeBeanDetail, CoffeeDrinkDetail } from '../model/api-responses';
import { AppStorageService } from '../app-storage.service';
import { CoffeeService } from '../api/coffee.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonToolbar, IonButtons, IonButton, CommonModule, FormsModule, LucideAngularModule, IonFab, IonFabButton]
})
export class DetailPage {
  readonly Star = Star;
  readonly StarOff = StarOff;
  readonly X = X;
  
  beanId!: number;
  drinkId!: number;
  bean?: CoffeeBeanDetail;
  drink?: CoffeeDrinkDetail;

  constructor(
        private appStorage: AppStorageService,
        private coffeeService: CoffeeService,
        private modalCtrl: ModalController,
  ) { }

  async ionViewDidEnter() {
    this.coffeeService.getCoffeeBean(this.beanId).subscribe({
      next: (data) => {
        this.bean = data;
      },
    });
    this.coffeeService.getCoffeeDrink(this.drinkId).subscribe({
      next: (data) => {
        this.drink = data;
      },
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


  favorite() {
    console.log("add to favorites");
  }

}
