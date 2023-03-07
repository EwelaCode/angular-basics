import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Ingredient } from 'src/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
    // recipes: Recipe[] = [
    //     new Recipe(
    //         'Test Recipe', 
    //         'This is test', 
    //         'https://runningonrealfood.com/wp-content/uploads/2021/02/vegan-one-pot-pasta-recipe-oh.-3-700x1049.jpg',
    //         [
    //             new Ingredient('Pasta', 1),
    //             new Ingredient('Cheese', 3),
    //         ]
    //         ),
    //     new Recipe(
    //         'New Recipe', 
    //         'This is new recipe', 
    //         'https://runningonrealfood.com/wp-content/uploads/2021/02/vegan-one-pot-pasta-recipe-oh.-3-700x1049.jpg', 
    //         [
    //             new Ingredient('Potatoes', 1),
    //             new Ingredient('Meat', 2),
    //         ]
    //         )
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService){}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}