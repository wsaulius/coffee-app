import { CoffeeSpecies } from "./species";
export class CoffeeBean {
    id: Number;
    name: string;
    description: string;
    roast: Number;
    species: CoffeeSpecies;
    country_origin: Array<string>;
    country_roasted: string;


    constructor(id: Number, name: string, description: string, roast: Number, species: CoffeeSpecies, country_origin: Array<string>, country_roasted: string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.roast = roast;
        this.species = species;
        this.country_origin = country_origin;
        this.country_roasted = country_roasted;
    }
}