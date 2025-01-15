import { Component } from '@angular/core';
import { IonHeader, ModalController, IonBackButton, IonCard, IonRefresher, IonRefresherContent, IonFab, IonCardHeader, IonButtons, IonButton, IonCardTitle, IonModal, IonSearchbar, IonCardContent, IonCardSubtitle, IonToolbar, IonFabButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AppStorageService } from '../app-storage.service';
import { BEANS_FETCHED, MOCK_DATA } from '../app.constants';
import { CoffeeBean } from '../model/bean';
import { CoffeeSpecies } from '../model/species';
import { CoffeeBeanListing } from '../model/api-responses';
import { CoffeeService } from '../api/coffee.service';
import { DetailPage } from '../detail/detail.page';
import { FilterPipe } from '../filter.pipe';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [DetailPage, IonHeader, FormsModule, IonToolbar, FilterPipe, IonRefresher, IonRefresherContent, IonCard, IonBackButton, IonFab, IonCardHeader, IonSearchbar, IonModal, IonButtons, IonButton, IonCardContent, IonCardTitle, IonCardSubtitle, IonTitle, IonContent, IonFabButton],
  providers: [AppStorageService, CoffeeService],
})

export class Tab1Page {
  beansArray: Array<CoffeeBeanListing> = [];
  searchText: string = "";
  mockData = false;

  constructor(
    private appStorage: AppStorageService,
    private coffeeService: CoffeeService,
    private modalCtrl: ModalController,
  ) {}

  cacheBeans(beans: Array<CoffeeBeanListing>) {
    this.appStorage.set(BEANS_FETCHED, beans);
  }

  async fetchBeans() {
    const coffeeBeans = await firstValueFrom(await this.coffeeService.getAllCoffeeBeans());
    this.cacheBeans(coffeeBeans);
    this.updateView(coffeeBeans);

  }

  updateView(data: Array<CoffeeBeanListing>) {
    this.beansArray = data;
  }

  async ionViewDidEnter() {    
    const mockData = await this.appStorage.get(MOCK_DATA);
    if (mockData == true) {
      this.beansArray = [];
      this.mockData = mockData;
      this.generateMockData();
      return;
    }
    const data = await this.appStorage.get(BEANS_FETCHED);
    if (data) {
      this.updateView(data);
    } else {
      this.fetchBeans();
    }
  }

  async showDetail(beanId: Number) {
    if (this.mockData == false) {
      const modal = await this.modalCtrl.create({
        component: DetailPage,
        componentProps: {
          beanId: beanId
        }
      });
      modal.present();
    } else {
      const bean = this.beansArray.find((bean) => bean.id === beanId);
      const modal = await this.modalCtrl.create({
        component: DetailPage,
        componentProps: {
          bean: bean,
        },
      });
      return await modal.present();
    }
  }

  async refresh(event: CustomEvent) {
    this.fetchBeans().then(() => {
      (event.target as HTMLIonRefresherElement).complete();
    });
  }

  // Unused mock data
  private generateMockData() {
    const sample1 = new CoffeeBean(1, "Sample Coffee Beans", "Delicious!", 3, new CoffeeSpecies("Arabica", "Classic"), ["Brazil", "India", "Mexico"], "Czechia");
    const sample2 = new CoffeeBean(2, "Some other Coffee Beans", "Also delicious!", 4, new CoffeeSpecies("Robusta", "Also classic"), ["Brazil"], "Italy");
    this.beansArray.push(sample1);
    this.beansArray.push(sample2);
  }
}
