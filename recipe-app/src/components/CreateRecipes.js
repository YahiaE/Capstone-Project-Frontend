import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Navbar from "./Navbar"
import axios from "axios"
import AsyncSelect from "react-select/async";
import ListofIngredients from "./ListofIngredients";
import {useActionKeyContext, useDispatchContext} from "./context/RecipeContext";


export default function CreateRecipes() {
    //search field state
    const [searchField, setSearchField] = useState("")
    //requested list from api state
    const [ingredientsList, setIngredientsList] = useState([])
    //Added ingredients state
    const [addedList, setAddedList] = useState({})
    //sets string value of the query
    const [query, setQuery] = useState("")
    //sets ID value of the query
    const [ingredientID, setIngredientID] = useState(null)
    //state for ingredient nutrition info
    const [ingredientNutrition, setIngredientNutrition] = useState(null)
    //state for amount of ingredient
    const [amount, setAmount] = useState()
    //an array of objects that contains the ingredients the user makes
    const [userIngredientList, setUserIngredientList] = useState([])
    //recipe state
    const [recipe, setRecipe] = useState()
    //change state
    const [change, setChange] = useState(false)

    const dispatch = useDispatchContext()
    const ACTION = useActionKeyContext()



    //apikey
    const apiKey = '135105a81ad44fc89fc31589dcff5303'
    //API Keys
    //0ff1d546021945128788f803cac47584
    //dd323d58462c4007843ea152dc7fee30
    //6693ceb5d7454ecca429359308d788ed
    //135105a81ad44fc89fc31589dcff5303
    //084ccfa492e6484e8e1b6294d9c7bbb4
    //fed50daa930847a1a3cf282ef28c9f3b

    //returns to AsyncSelect for the dropdown bar ingredient search
    const loadOptions = async () => {
        return ingredientsList
    }

    //This fetches the api for the name of the ingredient
    useEffect(async () => {
        if (searchField !== "") {
            const data = await axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${searchField}&number=5`)
            setIngredientsList(data.data)
        }
    }, [searchField]);

    //This fetches the api for the ID of the ingredient
    useEffect(async () => {
        if (query !== "") {
            const data = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=${query}`)
            setIngredientID(data.data.results[0].id)
        }
    }, [query])

    //fetches the api for the nutritional information
    useEffect(async () => {
        if (ingredientID !== null) {
            const data = await axios.get(`https://api.spoonacular.com/food/ingredients/${ingredientID}/information?apiKey=${apiKey}&amount=${amount}`)
            let obj = {
                ingredient: query,
                quantity:amount
                // calories: data.data.nutrition.nutrients[17].amount, 
            }
            setUserIngredientList(prev => prev.concat(obj))
        }
    }, [change])

    console.log(userIngredientList)
    //submit handler for add button
    function submitHandler(e) {

        setAmount(e.target[1].value)
        e.preventDefault()
        e.target[1].value = ""
        setChange(prev => !prev)

    }

    function recipeSubmit(e){
        e.preventDefault()
        let obj = {
            name: e.target[0].value,
            level_of_diff: e.target[2].value ,
            description: e.target[1].value ,
            time: e.target[3].value,
            steps: e.target[4].value ,
        }

        console.log(obj)
        dispatch({type: ACTION.ADD_RECIPE, payload: obj})

    }

    return (
        <div>
            <Navbar />
            <div className="wrapperForm">
                <form className="myForm" onSubmit={recipeSubmit}>
                    <div className="input_div">
                        <label className="name_txt">Recipe Name: </label>
                        <input type="text" name="name"></input>
                    </div>
                    <div className="input_div">
                        <label className="description_text">Description: </label>
                        <input className="description_box" type="text" name="description"></input>
                    </div>
                    <div className="input_div">
                        <label>Diffuculty Level: </label>
                        <input type="text" name="level_of_diff"></input>
                    </div>
                    <div className="input_div">
                        <label>Time: </label>
                        <input type="text" name="time"></input>
                    </div>
                    <div className="input_div">
                        <label>Steps: </label>
                        <input type="text" name="steps"></input>
                    </div>
                    <div className="input_div">
                        <input className="submitBtn" type="submit" value="Submit"></input>
                    </div>
                </form>
                <form className="ingredients_input" onSubmit={submitHandler}>
                    <legend>here</legend>
                    <div>
                        <label className="ingredients">Ingredients: </label>
                        {/* <input type="text" name="ingredients" onChange={handleSearch}></input> */}
                        <AsyncSelect
                            loadOptions={loadOptions}
                            onInputChange={(value) => setSearchField(value)}
                            onChange={(value) => setQuery(value.name)}
                            getOptionLabel={data => data.name}
                        />
                    </div>
                    <label className="quanLbl">Quantity: </label>
                    <input className="quanInpt" type="number" min={0} />
                    <button type="submit" value="Submit">Add</button>
                    <div>

                        <ListofIngredients data = {userIngredientList} keyId ={ingredientID} />

                    </div>
                        
                </form>              
            </div>
        </div>
    )
}