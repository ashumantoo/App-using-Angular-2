import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, take, tap, exhaustMap } from "rxjs/operators";

import { Recipe } from "app/recipes/recipe.model";
import { RecipeService } from "app/recipes/recipe.service";
import { AuthService } from "app/auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put('https://foodfluent-recipe-book.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    addRecipe(recipe) {
        console.log(recipe);
        return this.http.post('https://foodfluent-recipe-book.firebaseio.com/recipes.json', recipe);
    }

    fetchRecipes() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
                .get<Recipe[]>('https://foodfluent-recipe-book.firebaseio.com/recipes.json',
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                );
        }), map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
            tap(recipes => {
                console.log(recipes);
                this.recipeService.setRecipes(recipes);
            })
        );
        // .pipe();
        // .subscribe()
    }
}