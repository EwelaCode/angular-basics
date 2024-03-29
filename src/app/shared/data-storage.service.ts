import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Recipe } from 'src/app/recipes/recipe.model';
import {  map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
        ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        // we could return and use subscribe to add spinner
        this.http.put('https://angular-basics-7492c-default-rtdb.firebaseio.com/recipes.json', 
        recipes).subscribe(response => {
            console.log(response);
        })
    }

  fetchRecipes() {
      return this.http
        .get<Recipe[]>(
          'https://angular-basics-7492c-default-rtdb.firebaseio.com/recipes.json',
        ).pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            });
          }),
          tap(recipes => {
            this.recipeService.setRecipes(recipes);
          })
        )
  }
}