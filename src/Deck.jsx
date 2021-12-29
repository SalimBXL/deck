import React, { useState, useEffect } from 'react';
import "./Deck.css";
import axios from 'axios';
import Card from "./Card";

const API_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawnCards, setDrawnCards] = useState([]);

    useEffect(() => {
        getDeckID();
    }, [])

    async function getDeckID() {
        const url = API_URL + "/new/shuffle/";
        let deck = await axios.get(url);
        setDeck(deck.data);
    }

    async function getCard() {
        const url = API_URL + "/" + deck.deck_id + "/draw/?count=1";
        try {
            let response = await axios.get(url);
            if (response.data.remaining === 0 && !response.data.success) {
                throw new Error("No card remaining!");
            }
            let card = response.data.cards[0];
            setDrawnCards(prevs => [
                ...prevs, 
                {
                    id: card.code,
                    image: card.image,
                    name: card.value + " of " + card.suit
                }
            ]);
        } catch (err) {
            alert(err);
        }
    }

    const cards = drawnCards.map((cardToRender) => <Card  
                                            key={cardToRender.id}
                                            image={cardToRender.image} 
                                            name={cardToRender.name} />);

    return (
        <div className='Deck'>
            <h1 className='Deck-title'>* Card Dealer * </h1>
            <h2 className='Deck-title subtitle'>* A little demo made with React *</h2>
            <button className='Deck-btn' onClick={() => getCard()}>Get Card!</button>
            <div className='Deck-cardarea'>{cards}</div>
        </div>
    );
}

export default Deck;