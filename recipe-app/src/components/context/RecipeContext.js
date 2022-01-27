import React, {useContext, useEffect, useReducer} from "react";
import axios from "axios";

const ActionKeyContext = React.createContext()
const DispatchContext = React.createContext()
const RecipesContext = React.createContext()

export function useActionKeyContext() {
    return useContext(ActionKeyContext)
}

export function useDispatchContext() {
    return useContext(DispatchContext)
}

export function useRecipesContext() {
    return useContext(RecipesContext)
}


const ACTIONS = {
    INITIALIZE: 'init',
    ADD_RECIPE: 'add',
    REMOVE_RECIPE: 'remove',
    UPDATE_RECIPE_INFO: 'update'
}

let change = false;

//Recipe Reducer
function reducer(recipe, action) {
    switch (action.type) {
        case ACTIONS.INITIALIZE:
            return action.payload
        case ACTIONS.ADD_RECIPE: {
            addRecipe(action.payload)
            change = true;

        }
        case ACTIONS.REMOVE_RECIPE:
            return
        case ACTIONS.UPDATE_RECIPE_INFO:
            return
    }
}



//Ingredients Reducer
function ingredientsReducer(recipe, action) {
    switch (action.type) {
        case ACTIONS.INITIALIZE:
            return action.payload
        case ACTIONS.ADD_RECIPE: {
            addIngredients(action.payload)
            change = true;
        }
        case ACTIONS.REMOVE_RECIPE:
            return
        case ACTIONS.UPDATE_RECIPE_INFO:
            return
    }
}

//Add an ingredient
function addIngredients(payload) {

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
                    {children}
                </DispatchContext.Provider>
            </RecipesContext.Provider>
        </ActionKeyContext.Provider>
    )

}

export default RecipeAPIProvider;