// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
// import { Recipe } from "./recipe.model";
// import { Injectable } from "@angular/core";
// import { DataStorageService } from "app/shared/data-storage.service";
// import { RecipeService } from "./recipe.service";

// @Injectable()
// export class RecipeResolverService implements Resolve<Recipe[]>{

//     constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         const recipes = this.recipesService.getRecipes();
//         if (recipes.length === 0) {
//             return this.dataStorageService.fetchRecipes();
//         } else {
//             return recipes;
//         }
//     }
// }