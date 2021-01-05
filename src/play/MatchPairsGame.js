import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import PoliceImage from '../assets/images/police.png';
import TramImage from '../assets/images/tram.jpg';
import TrainImage from '../assets/images/train.jpg';
import BicycleImage from '../assets/images/bicycle.png';
import MotorcycleImage from '../assets/images/motorcycle.jpg';
import CarImage from '../assets/images/redCar.png';
import BusImage from '../assets/images/bus.jpg';
import KidsImage from '../assets/images/kids.jpg';
import GarageImage from '../assets/images/garage.jpg';

const Wrapper = styled.div`
    background: #DC2424;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #4A569D, #DC2424);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #4A569D, #DC2424); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    
    .Card{
      flex: 1;
      transition: all .2s;
    }
    
    .Card:hover{
      cursor: pointer;
      transform: scale(1.05);
    }
    
    .Card img{
      width: 180px;
      height: 180px;
      border-radius: 10px;
    }
`;

const Title = styled.h3`
  font-family: 'Dancing Script', cursive;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 32px;
  font-size: 46px;
  color: #ffffff;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.1);
`;

const Text = styled.div`
  font-family: 'Dancing Script', cursive;
  text-align: center;
  font-size: 46px;
  color: #ffffff;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.1);
  margin: auto;
`;

const Board = styled.div`
  height: 800px;
  width: 800px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap
`;

const shuffle = (cards) => {
    for (let i = 0; i < cards.length; i++) {
        let randomIdx = Math.floor(Math.random() * cards.length)
        let copyCurrent = {...cards[i]}
        let copyRandom = {...cards[randomIdx]}

        cards[i] = copyRandom
        cards[randomIdx] = copyCurrent
    }

    return cards
}

const buildCards = () => {
    let id = 0
    const images = {
        tram: TramImage,
        train: TrainImage,
        bike: BicycleImage,
        car: CarImage,
        bus: BusImage,
        moto: MotorcycleImage,
        kids: KidsImage,
        garage: GarageImage,
    }

    const cards = Object.keys(images).reduce((result,key) => {
        const createCard = () => ({
            id: id++,
            type: key,
            backImg: PoliceImage,
            frontImg: images[key],
            flipped: false
        })

        return [...result, createCard(), createCard()]
    }, [])

    return shuffle(cards)
}

const MatchPairGame = () => {
    const [cards, setCards] = useState(buildCards())
    const [checkers, setCheckers] = useState([])
    const [completed, setCompleted] = useState([])

    const onCardClick = card => () => {
        if (checkersFull(checkers) || cardAlreadyInCheckers(checkers, card)) return
        const newCheckers = [...checkers, card]
        setCheckers(newCheckers)
        const cardsInCheckersMatched = validateCheckers(newCheckers)

        if (cardsInCheckersMatched) {
            setCompleted([...completed, newCheckers[0].type])
        }

        if (checkersFull(newCheckers)) {
            resetCheckersAfter(1000)
        }

        function validateCheckers(checkers){
            return checkers.length === 2 &&
                checkers[0].type === checkers[1].type
        }

        function cardAlreadyInCheckers(checkers, card){
            return checkers.length === 1 && checkers[0].id === card.id
        }

        function checkersFull(checkers){
            return checkers.length === 2
        }

        function resetCheckersAfter(time) {
            setTimeout(() => {
                setCheckers([])
            }, time)
        }
    }

    useEffect(() => {
        const newCards = cards.map(card => ({
            ...card,
            flipped:
                checkers.find(c => c.id === card.id) ||
                completed.includes(card.type),
        }))
        setCards(newCards)
    }, [checkers, completed])

    return (
        <Wrapper>
            <Title>GASESTE PERECHILE</Title>
            <Board>
                {cards.map(card => {
                    const img = card.flipped ? card.frontImg : card.backImg

                    return (
                        <div className="Card" onClick={onCardClick(card)} key={card.id}>
                            <img src={img} alt="Card"/>
                        </div>
                    )
                })}
                {completed.length === 8 && <Text>FELICITARI! 🎉</Text>}
            </Board>
        </Wrapper>
    );
};

export default MatchPairGame;