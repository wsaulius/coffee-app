import { Component } from '@angular/core';
import { IonModal, IonButtons, IonFabButton, IonFab, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonSearchbar, IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
import { LucideAngularModule, X, Star, StarOff } from 'lucide-angular';
import { AppStorageService } from '../app-storage.service';
import { DRINKS_STORAGE } from '../app.constants';
import { Storage } from '@ionic/storage-angular';
import { CoffeeDrink } from '../model/drink';
import { CoffeeIngredient } from '../model/ingredient';
import { CoffeeService } from '../api/coffee.service';
import { CoffeeDrinkListing } from '../model/api-responses';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, LucideAngularModule, IonFabButton, IonFab, IonModal, IonButton, IonButtons, IonToolbar, IonTitle, IonContent, IonList, IonSearchbar, IonItem, IonLabel, IonThumbnail],
  providers: [AppStorageService, Storage],
})
export class Tab2Page {
  readonly Star = Star;
  readonly StarOff = StarOff;
  readonly X = X;
  drinksArray: Array<CoffeeDrink> = [];
  isModalOpen = false;
  drinkResponse?: Array<CoffeeDrinkListing>;

  constructor(
    private appStorage: AppStorageService,
    private coffeeService: CoffeeService,
  ) {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  saveDrinks() {
    this.appStorage.set(DRINKS_STORAGE, this.drinksArray)
  }
  async ionViewDidEnter() {
    this.coffeeService.getAllCoffeeDrinks().subscribe({
      next: (data) => {
        console.log(data);
        this.drinkResponse = data;
      },
    });
    const data = await this.appStorage.get(DRINKS_STORAGE);
    if (data) {
      this.drinksArray = data;
    } else {
      if(this.drinksArray.length === 0) {
        this.generateMockData();
      }
    }
  }

  private generateMockData() {
    const sample1 = new CoffeeDrink(1, "Your favourite coffee drink", "Simply the best!", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoffeforus.com%2Fwp-content%2Fuploads%2F2022%2F12%2FAmericano-coffee-recipe.jpg&f=1&nofb=1&ipt=0a28cc5ba5fc881e4922d84c99da6bac85e786d174aa8b831f616bca7a8b58fa&ipo=images", [new CoffeeIngredient("Espresso", 30)]);
    const sample2 = new CoffeeDrink(2, "The just the right content of milk coffee", "Tasty!", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fc%2Fc8%2FCappuccino_at_Sightglass_Coffee.jpg&f=1&nofb=1&ipt=1539727a8cedb46192d4f500c9ede5de2c511f11a0057e6a1e9de1d975ce8198&ipo=images", [new CoffeeIngredient("Espresso", 30), new CoffeeIngredient("Milk", 60)]);
    this.drinksArray.push(sample1);
    this.drinksArray.push(sample2);
  }
}
