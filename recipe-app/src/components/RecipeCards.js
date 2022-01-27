import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import logoLoad from '../images/loading.gif'
import { Link } from "react-router-dom";
import timer from '../images/timer2.png'

export default function RecipeCards() {


    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const getRecipes = async () => {
            const data = await axios.get("http://localhost:3001/recipe")
            setRecipes(data.data)
        }
        getRecipes()
    }, []);


    console.log(recipes)
    if (recipes.length < 1) {
        console.log("loading")
        return (
            <div>
                <img className="loader" src={logoLoad} alt="loading" style={{width: "500px"}}/>
            </div>
        )
    } else {
        console.log("Recipes Loaded!");
        return (
            <div>
                <ul className="recipeContainer">
                    

                {recipes.map((item) => {
                        return( 
                     <div className="recipe_box">
                        <div className="panel">
                        <div className="topPanel">
                                <img className="panelImg" src={item.img} />
                                <div className="bottomPanel">
                                    <h3 className="recipeName">{item.name}</h3>
                                    <div>
                                        <div className="description">
                                            <h5 className="desText">{item.description}</h5>
                                        </div>
                                        <div className="timeFlex">
                                        <img className="timer" src={timer}  />
                                            <p >{item.time}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>














                        )
                    })}
                   
                </ul>
            </div>
        );
    }
}