import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";


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
            <p>Loading</p>
        )
    } else {
        return (
            <div className="recipe_box">
                {recipes.map((item) => {
                    return (
                        <div key={item.RecordNumber}>
                            <div className="panel" >
                                <div className="topPanel">
                                    <h3 className="recipe_title" >{item.City}</h3>
                                    <p className="date_text" >Date: {item.Country}</p>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

        );
    }
}