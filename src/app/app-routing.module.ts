import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: 'shopping-list', loadChildren: './shopping-list/shoppingList.module#ShoppingListModule' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
]

@NgModule({
    imports: [
        //This preloadingStrategy is used to pre load all the lazy loading so //that should load as soon as it called a certain routes
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }