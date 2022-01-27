import React, {useContext, useEffect, useReducer} from "react";
import axios from "axios";

const ActionKeyContext = React.createContext()
const DispatchContext = React.createContext()
const RecipesContext = React.createContext()
const IngredientsDispatchContext = React.createContext()
const IngredientsContext = React.createContext()

export function useActionKeyContext() {
    return useContext(ActionKeyContext)
}

export function useDispatchContext() {
    return useContext(DispatchContext)
}

export function useRecipesContext() {
    return useContext(RecipesContext)
}


export function useIngredientsDispatchContext() {
   return useContext(IngredientsDispatchContext)
}

export function useIngredientsContext() {
    return useContext(IngredientsContext)
}


const ACTIONS = {
    INITIALIZE: 'init',
    ADD: 'add',
    REMOVE: 'remove',
    UPDATE_INFO: 'update'
}

let change = false;

//Recipe Reducer
function reducer(recipe, action) {
    switch (action.type) {
        case ACTIONS.INITIALIZE:
            return action.payload
        case ACTIONS.ADD: {
            addRecipe(action.payload)
            change = true;
        }
        case ACTIONS.REMOVE:
            return
        case ACTIONS.UPDATE_INFO:
            return
    }
}



//Ingredients Reducer
function ingredientsReducer(ingredients, action) {
    switch (action.type) {
        case ACTIONS.INITIALIZE:
            return action.payload
        case ACTIONS.ADD: {
            addIngredients(action.payload)
            change = true;
        }
        case ACTIONS.REMOVE:
            return
        case ACTIONS.UPDATE_INFO:
            return
    }
}

//Add an ingredient
async function addIngredients(ingredients) {
    let response
    //ingredients.recipeId {
        //get most recent recipe, and then copy its id here or osmethintg
    //}
    try {
        await axios.post('http://localhost:3001/recipe/addIngredients', ingredients).then(val => {
            response = val.data
        })
    } catch (e) {
        alert("Error adding ingredients")
    }
    return response
}

async function addRecipe(recipe) {
    let response
    try {
        await axios.post('http://localhost:3001/recipe/addRecipe', recipe).then(val => {
            response = val.data
        })
    } catch (e) {
        alert("Error adding recipe")
    }
    return response
}

function RecipeAPIProvider({children}) {
    const [recipes, dispatch] = useReducer(reducer, {})
    const [ingredients, ingredientsDispatch] = useReducer(ingredientsReducer, {})

    let response
    useEffect(async () => {
        console.log(recipes)
        response = recipes;
    }, [recipes])

    useEffect(async () => {

        try {
            await axios.get('http://localhost:3001/recipe/').then(val => {
                response = val.data
                change = false
                dispatch({type: ACTIONS.INITIALIZE, payload: response})
                console.log("I happened! I initialized!")
            })
        } catch (e) {
            alert("Error retrieving recipes")
        }
    }, [change])

    return (
        <ActionKeyContext.Provider value={ACTIONS}>
            <RecipesContext.Provider value={recipes}>
                <DispatchContext.Provider value={dispatch}>
                    <IngredientsContext.Provider value={ingredients}>
                        <IngredientsDispatchContext.Provider value={ingredientsDispatch}>
                            {children}
                        </IngredientsDispatchContext.Provider>
                    </IngredientsContext.Provider>
                </DispatchContext.Provider>
            </RecipesContext.Provider>
        </ActionKeyContext.Provider>
    )

}

export default RecipeAPIProvider;