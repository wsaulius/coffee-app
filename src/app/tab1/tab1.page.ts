import { Component } from '@angular/core';
import { IonHeader, ModalController, IonBackButton, IonCard, IonFab, IonCardHeader, IonButtons, IonButton, IonCardTitle, IonModal, IonSearchbar, IonCardContent, IonCardSubtitle, IonToolbar, IonFabButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AppStorageService } from '../app-storage.service';
import { BEANS_FETCHED } from '../app.constants';
import { CoffeeBean } from '../model/bean';
import { CoffeeSpecies } from '../model/species';
import { CoffeeBeanListing } from '../model/api-responses';
import { CoffeeService } from '../api/coffee.service';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [DetailPage, IonHeader, IonToolbar, IonCard, IonBackButton, IonFab, IonCardHeader, IonSearchbar, IonModal, IonButtons, IonButton, IonCardContent, IonCardTitle, IonCardSubtitle, IonTitle, IonContent, IonFabButton],
  providers: [AppStorageService, CoffeeService],
})

export class Tab1Page {
  beansArray: Array<CoffeeBeanListing> = [];

  constructor(
    private appStorage: AppStorageService,
    private coffeeService: CoffeeService,
    private modalCtrl: ModalController,
  ) {}

  cacheBeans(beans: Array<CoffeeBeanListing>) {
    this.appStorage.set(BEANS_FETCHED, beans);
  }

  async fetchBeans() {
    this.coffeeService.getAllCoffeeBeans().subscribe({
      next: (data) => {
        this.cacheBeans(data);
      },
    });
  }

  updateView(data: Array<CoffeeBeanListing>) {
    this.beansArray = data;
  }

  async ionViewDidEnter() { // TODO: Make sure to update view if appStorage is empty
    const data = await this.appStorage.get(BEANS_FETCHED);
    if (data) {
       this.updateView(data);
    } else {
      this.fetchBeans();
    }
  }

  async showDetail(beanId: Number) {
    const modal = await this.modalCtrl.create({
      component: DetailPage,
      componentProps: {
        beanId: beanId
      }
    });
    modal.present();
  }

  // Unused mock data
  private generateMockData() {
    const sample1 = new CoffeeBean(1, "Sample Coffee Beans", "Delicious!", 3, new CoffeeSpecies("Arabica", "Classic"), ["Brazil", "India", "Mexico"], "Czechia");
    const sample2 = new CoffeeBean(2, "Some other Coffee Beans", "Also delicious!", 4, new CoffeeSpecies("Robusta", "Also classic"), ["Brazil"], "Italy");
    this.beansArray.push(sample1);
    this.beansArray.push(sample2);
  }
}
