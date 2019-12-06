import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'app/shared/data-storage.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeChangeSubscription: Subscription

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.recipeChangeSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      })
    // this.recipes = this.recipeService.getRecipes();
    this.dataStorageService.fetchRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activeRoute });
  }

  ngOnDestroy() {
    this.recipeChangeSubscription.unsubscribe();
  }

}
