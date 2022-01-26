import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Navbar from "./Navbar"
import axios from "axios"
import AsyncSelect from "react-select/async";

export default function CreateRecipes() {
    //search field state
    const [searchField, setSearchField] = useState("")
    //requested list from api state
    const [ingredientsList, setIngredientsList] = useState(null)
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
    //calories
    const [calories, setCalories] = useState(null)
    //recipe state
    const [recipe, setRecipe] = useState()

    //apikey
    const apiKey = '135105a81ad44fc89fc31589dcff5303'
    //API Keys
    //0ff1d546021945128788f803cac47584
    //dd323d58462c4007843ea152dc7fee30
    //6693ceb5d7454ecca429359308d788ed
    //135105a81ad44fc89fc31589dcff5303

    //returns to AsyncSelect for the dropdown bar ingredient search
    const loadOptions = async () => {
        return ingredientsList
    }

    //This fetches the api for the name of the ingredient
    useEffect(() => {
        const getIngredients = async () => {
            if (searchField !== "") {
                const data = await axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${searchField}&number=5`)
                //console.log(data)
                setIngredientsList(data.data)
            }
        }
        getIngredients()
    }, [searchField]);

    //This fetches the api for the ID of the ingredient
    useEffect(() => {
        const setQueryId = async () => {
            if (query !== "") {
                const data = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=${query}`)
                console.log(data)
                console.log(data.data.results[0].id)
                setIngredientID(data.data.results[0].id)
            }
        }
        setQueryId()
    }, [query])

    //fetches the api for the nutritional information
    useEffect(() => {
        const getIngredientInfo = async () => {
            if (ingredientID !== null) {
                const data = await axios.get(`https://api.spoonacular.com/food/ingredients/${ingredientID}/information?apiKey=${apiKey}&amount=${amount}`)
                console.log(data)
                setIngredientNutrition(data)
            }
        }
        getIngredientInfo()
    }, [query,amount])

    //logging nutrition to make sure its there
    useEffect(() => {
        console.log(ingredientNutrition)
        if (ingredientNutrition !== null) {
            setCalories(ingredientNutrition.data.nutrition.nutrients[17].amount)
        }
    }, [ingredientNutrition])

    //loggin calories
    useEffect(() => {
        console.log(calories)
    }, [calories])

    //submit handler for add button
    function submitHandler(e) {
        e.preventDefault()
        let obj = {
            name: query,
            calories: calories,
        }
        
        let arr = userIngredientList.concat(obj)
        setUserIngredientList(arr)
        const ingredientForm = document.querySelector(".ingredients_input")
        
        ingredientForm.reset();
        
    }

    //setting amount everything it is changed
    function handleNumber(event){
        setAmount(event.target.value)
    }
    console.log(amount)

    console.log(userIngredientList)

    return (
        <div>
            <Navbar />
            <div className="wrapperForm">
                <form className="myForm">
                    <div>
                        <label className="name_txt">Name: </label>
                        <input type="text" name="name"></input>
                    </div>
                    <div>
                        <label className="description_text">Description: </label>
                        <input type="text" name="description"></input>
                    </div>
                    <div>
                        <label>Diffuculty Level: </label>
                        <input type="text" name="level"></input>
                    </div>
                    <div>
                        <input className="submitBtn" type="submit" value="Submit"></input>
                    </div>
                </form>
                <form className="ingredients_input" onSubmit={submitHandler}>
                    <div>
                        <label className="ingredients">Ingredients: </label>
                        {/* <input type="text" name="ingredients" onChange={handleSearch}></input> */}
                        <AsyncSelect
                            loadOptions={loadOptions}
                            onInputChange={(value) => setSearchField(value)}
                            onChange={(value) => setQuery(value.name)}
                            // onChange={(value) => setQueryId(value)}
                            getOptionLabel={data => data.name}
                        />

                    </div>
                    <label className="quanLbl">Quantity: </label>
                    <input onChange={handleNumber} className="quanInpt" type="number" name="quantity" min={0}></input>
                    <button type="submit" value="Submit">Add</button>
                </form>
            </div>
        </div>
    )
}