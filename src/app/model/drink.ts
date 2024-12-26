import { CoffeeIngredient } from "./ingredient";
export class CoffeeDrink {
    id: Number;
    name: string;
    description: string;
    image_url: string;
    ingredients: Array<CoffeeIngredient>;


    constructor(id: Number, name: string, description: string, image_url: string, ingredients: Array<CoffeeIngredient>){
        this.id = id;
        this.name = name;
        this.description = description;
        this.image_url = image_url;
        this.ingredients = ingredients;
    }
}