import React from "react"
import Navbar from "./Navbar"

export default function Home() {
    return (
        
        <div className="container">
            <Navbar />
            <div className="home_page">

                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    className="home_background"
                />
                <div className="home_img_text">
                    <h1>test</h1>
                </div>
                <div className="recent_recipes">
                    <h1>Recent Recipes</h1>
                </div>
            </div>
        </div>
    )
}