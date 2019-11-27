import { Recipe } from './recipe.model'
import { EventEmitter } from '@angular/core';

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
        new Recipe('Sweet and Chizze Pizza', 'Full of testy , creaspy and salty pizza', 'https://media.fshoq.com/images/316/pizza-with-vegetables-on-a-wooden-table-316-small.jpg'),
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}