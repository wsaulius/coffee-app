import { CoffeeIngredient } from "./ingredient";
import { CoffeeSpecies } from "./species";

export interface CoffeeDrinkListing {
    id: Number;
    name: string;
    description: string | null;
    image_url: string | null;
}

export interface CoffeeBeanListing {
    id: Number;
    name: string;
    description: string | null;
}

export interface CoffeeDrinkDetail {
    name: string;
    description: string | null;
    image_url: string | null;
    ingredients: Array<CoffeeIngredient>;
}

export interface CoffeeBeanDetail {
    name: string;
    description: string | null;
    roast: Number;
    species: CoffeeSpecies;
    country_origin: Array<string>;
    country_roasted: string;
}