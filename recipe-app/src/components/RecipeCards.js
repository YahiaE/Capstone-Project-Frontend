import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import logoLoad from '../images/loader1.gif'
import { Link } from "react-router-dom";
import timer from '../images/timer2.png'

export default function RecipeCards() {


    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
        const getRecipes = async () => {
            const data = await axios.get("http://ctp-zip-api.herokuapp.com/zip/10001")
            setRecipes(data.data)
            
            

        }
        getRecipes()
    }, []);


    console.log(recipes)
    if (recipes === null) {
        return (
            //loading gif
            <div>
                <img className="loader" src={logoLoad} alt="loading" />

            </div>
        )
    } else {
        return (
            // <div className="recipe_box">
            //     {recipes.map((item) => {
            //         return (
            //             <div key={item.RecordNumber}>
            //                 <div className="panel" >
            //                     <div className="topPanel">
            //                         <h3 className="recipe_title" >{item.City}</h3>
            //                         <p className="date_text" >Date: {item.Country}</p>
            //                     </div>

            //                 </div>
            //             </div>
            //         );
            //     })}
            // </div>

            //testing
            <div >
                <ul className="recipeContainer">
                    <div className="recipe_box">
                        <div className="panel">
                            <div className="topPanel">
                                <img className="panelImg" src="https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg" />
                                <div className="bottomPanel">
                                    <h3 className="recipeName">Pan Seared Steak</h3>
                                    <div>
                                        <div className="descrption">
                                        <h5 className="desText">Pan Seared Steak with Garlic Butter and Rosemary</h5>
                                        </div>
                                        <div className="timeFlex">
                                        <img className="timer" src={timer}  />
                                            <p >60 mins</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="recipe_box">
                        <div className="panel">
                            <div className="topPanel">
                                <h2>Recipe Name</h2>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        );
    }
}