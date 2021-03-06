import { Recipe } from './recipe.model'
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'Recipe',
            'This is simply a test',
            'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Frech Fries', 20)
            ]),
        new Recipe(
            'Sweet and Chizze Pizza',
            'Full of testy , creaspy and salty pizza',
            'https://media.fshoq.com/images/316/pizza-with-vegetables-on-a-wooden-table-316-small.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1),
            ]),
        new Recipe(
            'Gajar ka Halwa',
            'Very Tastfull to enjoy',
            'https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg',
            [
                new Ingredient('Milk', 500),
                new Ingredient('sugar', 200),
                new Ingredient('carot', 25)
            ]),
    ];

    // private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}