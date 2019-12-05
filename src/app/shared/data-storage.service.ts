import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Recipe } from "app/recipes/recipe.model";
import { RecipeService } from "app/recipes/recipe.service";
import { map } from "rxjs/operators";

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put('https://foodfluent-recipe-book.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>('https://foodfluent-recipe-book.firebaseio.com/recipes.json')
            // .pipe(map(recipes => {
            //     if (recipes) {
            //         return recipes.map(recipe => {
            //             return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            //         });
            //     }
            // }))
            .subscribe(recipes => {
                console.log(recipes);
                this.recipeService.setRecipes(recipes);
            })
    }
}