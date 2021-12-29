import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = ({image, name}) => {
    const [transform, setTransform] = useState(null);

    useEffect(() => {
        const angle = Math.random() * 90 -45;
        const xPos = Math.random() * 40 -20;
        const yPos = Math.random() * 40 -20;
        setTransform("translate(" + xPos + "px, " + yPos + "px) rotate(" + angle + "deg)");
    }, [])

    return (<div>
        <img style={{transform: transform}} className="Card" src={image} alt={name}></img>
    </div>);
}

export default Card;