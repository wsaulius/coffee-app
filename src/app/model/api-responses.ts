import { CoffeeIngredient } from "./ingredient";
import { CoffeeSpecies } from "./species";

export interface CoffeeDrinkListing {
    id: Number;
    name: string;
    description: string;
    image_url: string;
}

export interface CoffeeBeanListing {
    id: Number;
    name: string;
    description: string;
}

export interface CoffeeDrinkDetail {
    name: string;
    description: string;
    image_url: string;
    ingredients: Array<CoffeeIngredient>;
}

export interface CoffeeBeanDetail {
    name: string;
    description: string;
    roast: Number;
    species: CoffeeSpecies;
    country_origin: Array<string>;
    couontry_roasted: string;
}