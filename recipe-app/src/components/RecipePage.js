import Navbar from "./Navbar";
import timer from '../images/timerBlack-removebg-preview.png'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


export default function RecipePage() {

    const [recipeInfo, setRecipeInfo] = useState([])
    const [ingredientInfo, setIngredientInfo] = useState([])
    const { id } = useParams()

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(`https://capstone-project-ttp.herokuapp.com/recipe/${id}`)
            setRecipeInfo(data)
            console.log("rec" + data)         
        }
        fetchData().then(() => console.log("Data Fetched"))
    },[]);

    useEffect(() => {
        async function fetchData() {
            const ing = await axios.get(`https://capstone-project-ttp.herokuapp.com/recipe_items/list/${id}`)
            setIngredientInfo(ing.data)

        }
        fetchData().then(() => console.log("Data Fetched"))
    },[recipeInfo]);


    

    console.log(ingredientInfo)

    return (
        
        <div className="recipe_container">
            <Navbar />
            <div className="topPage">
                <div className="topBar" >
                    <h1>{recipeInfo.name}</h1>
                    <h3 className="test2"><em>{recipeInfo.description}</em></h3>
                </div>
                <div className="under_header_box">
                    <img className="timerRecipe" src={timer} />
                    <div className="timer_box">
                        <h3 className="time_text">{recipeInfo.time}</h3>
                    </div>
                    <p className="difficulty_text">Difficulty {recipeInfo.level_of_diff}</p>
                </div>


                <div className="orderPage">
                    <div className="imgHolder">
                        <img className="pageImg" src={recipeInfo.img} />
                    </div>
                    <div className="rightSide" >
                        
                        <h3>Ingredients</h3>
                        <div className="list_box">
                            <ul className="listItem">
                                {recipeInfo && ingredientInfo.map(item => {
                                    return (
                                        <li>{item.ingredient}, {item.quantity}</li>
                                    )
                                })}
                            </ul>

                        </div>
                    </div>

                </div>
            </div>
            <div className="topPage">
                <div className="box1">
                    <h2>Steps</h2>
                    <div className="box2">
                        <p >{recipeInfo.steps}</p>
                    </div>
                </div>


            </div>
        </div>

    )
}