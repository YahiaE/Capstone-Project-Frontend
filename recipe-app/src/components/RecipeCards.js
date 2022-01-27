import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import logoLoad from '../images/loading.gif'
import { Link } from "react-router-dom";
import timer from '../images/timer2.png'
import {useActionKeyContext, useDispatchContext, useIngredientsDispatchContext} from "./context/RecipeContext";
export default function RecipeCards(props) {


    const [recipes, setRecipes] = useState([])
    const dispatch = useDispatchContext()
    const ingredientDispatch = useIngredientsDispatchContext()
    const ACTION = useActionKeyContext()

    useEffect(() => {
        const getRecipes = async () => {
            const data = await axios.get("http://localhost:3001/recipe")

            if(props.isRecent){
                const limit = data.data.slice(0,5);
                setRecipes(limit)
            } else {
                setRecipes(data.data)
            }
            
            
        }
        getRecipes()
    }, []);


    if (recipes.length < 1) {
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
                        <div className="panel" onClick={() => console.log("Clicked On " + item.id)}>
                            
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
                                            <button key={item.id} className="delete" onClick={() => {
                                                dispatch({type: ACTION.REMOVE, payload: item.id})
                                                window.location.reload(false);
                                            }}><strong>X</strong></button>
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