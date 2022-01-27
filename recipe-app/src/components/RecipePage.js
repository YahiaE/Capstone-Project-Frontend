import Navbar from "./Navbar";
import timer from '../images/timerBlack-removebg-preview.png'


export default function RecipePage() {
    return (
        <div className="recipe_container">
            <Navbar />
            <div className="topPage">
                <div className="topBar" >
                    <h1>Pan Seared Steak</h1>
                </div>
                <div className="under_header_box">
                    <img className="timerRecipe" src={timer} />
                    <div className="timer_box">
                        <h3 className="time_text">60 Mins</h3>
                    </div>
                    <p className="difficulty_text">Difficulty 5</p>
                </div>


                <div className="orderPage">
                    <div className="imgHolder">
                        <img className="pageImg" src="https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg" />
                    </div>
                    <div className="rightSide" >
                        <h2 className="test2">Pan Seared Steak with Garlic Butter and Rosemary</h2>
                        <h3>Ingredients</h3>
                        <div className="list_box">
                            <ul className="listItem">
                                <li >apple, 2</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div className="topPage">
                <div className="box1">
                    <h2>Steps</h2>
                    <div className="box2">
                        <p >put the food in the pot.Then stir it hudhjasn sakdjskdsad kladjda jadjd asdjsldsl;daslmdfsfsffsfdsadasdadsdadsdsadadasddad</p>
                    </div>
                </div>


            </div>
        </div>

    )
}