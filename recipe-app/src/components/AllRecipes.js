import { useEffect } from "react"
import Navbar from "./Navbar"
import RecipeCards from "./RecipeCards"
import axios from "axios";
export default function AllRecipes(){
    const apiKey = 'dd323d58462c4007843ea152dc7fee30'
    
    // (async () => {
    //     // POST request using axios with async/await
        
    //     const article = {
    //         "title": "Spaghetti Carbonara",
    //         "servings": 2,
    //         "ingredients": [
    //             "1 lb spaghetti",
    //             "3.5 oz pancetta",
    //             "2 Tbsps olive oil",
    //             "1  egg",
    //             "0.5 cup parmesan cheese"
    //         ],
    //         "instructions": "Bring a large pot of water to a boil and season generously with salt. Add the pasta to the water once boiling and cook until al dente. Reserve 2 cups of cooking water and drain the pasta. "
    //     };
    //     const send = await axios.post(`https://api.spoonacular.com/recipes/analyze?apiKey=${apiKey}`, article);
    //     const data = await axios.get(`https://api.spoonacular.com/recipes/analyze?apiKey=${apiKey}`)
    //      console.log(send)
    //      console.log(data)
    // })();
    
    return(
        

        <div>
            <Navbar />
            <RecipeCards />
        </div>
    )
}