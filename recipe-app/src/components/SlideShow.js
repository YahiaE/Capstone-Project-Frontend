import React from "react";
import { useEffect, useState } from "react";

const colors = [".src/images/home_meal.jpg", "#00C49F", "#FFBB28"];
const delay = 2500;


export default function SlideShow() {
    const [index, setIndex] = useState(0)
    const timeoutRef = React.useRef(null)

    function ImageItem(src) {
        this.image = new Image();
        this.src = src
    }

    useEffect(() => {
        resetTimeout()
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );
        return () => {
            resetTimeout()
        }
    }, [index])

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    return (
        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {colors.map((backgroundColor, index) => (
                    <div
                        className="slide"
                        key={index}
                        style={{ backgroundColor }}
                    >
                        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            className="home_background"
                        />
                        <div className="home_img_text">
                            <h1>test</h1>
                        </div>
                    </div>
                ))}
            </div>

            <div className="slideshowDots">
                {colors.map((_, indx) => (
                    <div
                        key={indx}
                        className={`slideshowDot${index === indx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(indx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}