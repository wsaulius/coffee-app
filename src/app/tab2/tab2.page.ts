import { Component } from '@angular/core';
import { IonModal, IonButtons, IonFabButton, IonRefresher, IonRefresherContent, ModalController, IonFab, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonSearchbar, IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
import { LucideAngularModule, X, Star, StarOff } from 'lucide-angular';
import { AppStorageService } from '../app-storage.service';
import { DRINKS_FETCHED, MOCK_DATA } from '../app.constants';
import { Storage } from '@ionic/storage-angular';
import { CoffeeDrink } from '../model/drink';
import { CoffeeIngredient } from '../model/ingredient';
import { CoffeeService } from '../api/coffee.service';
import { CoffeeDrinkListing } from '../model/api-responses';
import { DetailPage } from '../detail/detail.page';
import { FilterPipe } from '../filter.pipe';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, LucideAngularModule, FilterPipe, IonRefresher, IonRefresherContent, FormsModule, IonFabButton, IonFab, IonModal, IonButton, IonButtons, IonToolbar, IonTitle, IonContent, IonList, IonSearchbar, IonItem, IonLabel, IonThumbnail],
  providers: [AppStorageService, Storage],
})
export class Tab2Page {
  readonly Star = Star;
  readonly StarOff = StarOff;
  readonly X = X;
  drinksArray: Array<CoffeeDrinkListing> = [];
  searchText: string = "";
  mockData = false;


  constructor(
    private appStorage: AppStorageService,
    private coffeeService: CoffeeService,
    private modalCtrl: ModalController,
  ) {}

  cacheDrinks(drinks: Array<CoffeeDrinkListing>) {
    this.appStorage.set(DRINKS_FETCHED, drinks);
  }

  async fetchDrinks() {
    const coffeeDrinks = await firstValueFrom(await this.coffeeService.getAllCoffeeDrinks());
    this.cacheDrinks(coffeeDrinks);
    this.updateView(coffeeDrinks);
  }

  updateView(data: Array<CoffeeDrinkListing>) {
    this.drinksArray = data;
  }

  async ionViewDidEnter() {
    const mockData = await this.appStorage.get(MOCK_DATA);
    if (mockData == true) {
      this.drinksArray = [];
      this.mockData = mockData;
      this.generateMockData();
      return;
    }
    const data = await this.appStorage.get(DRINKS_FETCHED);
    if (data) {
      this.updateView(data);
    } else {
      this.fetchDrinks();
    }
  }

  refresh(event: CustomEvent) {
    setTimeout(() => {
      this.fetchDrinks();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }

  async showDetail(drinkId: Number) {
    if (this.mockData == false) {
      const modal = await this.modalCtrl.create({
        component: DetailPage,
        componentProps: {
          drinkId: drinkId
        }
      });
      return await modal.present();
    } else {
      const drink = this.drinksArray.find((drink) => drink.id === drinkId);
      const modal = await this.modalCtrl.create({
        component: DetailPage,
        componentProps: {
          drink: drink,
        },
      });
      return await modal.present();
    }

  }

  // Unused mock data
  private generateMockData() {
    const sample1 = new CoffeeDrink(1, "Your favourite coffee drink", "Simply the best!", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoffeforus.com%2Fwp-content%2Fuploads%2F2022%2F12%2FAmericano-coffee-recipe.jpg&f=1&nofb=1&ipt=0a28cc5ba5fc881e4922d84c99da6bac85e786d174aa8b831f616bca7a8b58fa&ipo=images", [new CoffeeIngredient("Espresso", 30)]);
    const sample2 = new CoffeeDrink(2, "The just the right content of milk coffee", "Tasty!", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fc%2Fc8%2FCappuccino_at_Sightglass_Coffee.jpg&f=1&nofb=1&ipt=1539727a8cedb46192d4f500c9ede5de2c511f11a0057e6a1e9de1d975ce8198&ipo=images", [new CoffeeIngredient("Espresso", 30), new CoffeeIngredient("Milk", 60)]);
    this.drinksArray.push(sample1);
    this.drinksArray.push(sample2);
  }
}
