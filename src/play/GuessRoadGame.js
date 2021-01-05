import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router";
import Done from '@material-ui/icons/Done';
import shuffle from 'lodash/shuffle';

import BicycleImage from '../assets/images/guessRoadGame/vehicles/bicycle.jpg';
import CarImage from '../assets/images/guessRoadGame/vehicles/car.jpg';
import TrainImage from '../assets/images/guessRoadGame/vehicles/train.png';
import TractorImage from '../assets/images/guessRoadGame/vehicles/tractor.jpg';
import PedestrianImage from '../assets/images/guessRoadGame/vehicles/pedestrian.jpg';

import BicycleRoadImage from '../assets/images/guessRoadGame/roads/bicycle.jpg';
import CarRoadImage from '../assets/images/guessRoadGame/roads/car.jpg';
import TrainRoadImage from '../assets/images/guessRoadGame/roads/train.jpg';
import TractorRoadImage from '../assets/images/guessRoadGame/roads/tractor.jpg';
import PedestrianRoadImage from '../assets/images/guessRoadGame/roads/pedestrian.jpg';

const Wrapper = styled.div`
    background: #36D1DC;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: 100vw;
    height: 100vh;
`;

const GameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 64px;
`;

const Column = styled.div`
  width: 30%;
  height: 100vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  cursor: pointer;
  margin: 12px 0;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border: 6px solid #ffffff;
  
  ${props => props.active && `
    border: 6px solid #42f54e;
  `}
  
  ${props => props.matched && `
    border: 6px solid #ffffff;
  `}
`;

const ImageDone = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: rgba(66, 245, 78, 0.5);
  color: #ffffff;
  font-size: 40px !important;
`;

const Text = styled.div`
  font-family: 'Dancing Script', cursive;
  text-align: center;
  font-size: 46px;
  color: #ffffff;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.1);
  margin: auto;
`;

const firstElementsArray = [{
    image: BicycleImage,
    value: 'bicycle',
}, {
    image: CarImage,
    value: 'car',
}, {
    image: TrainImage,
    value: 'train',
}, {
    image: TractorImage,
    value: 'tractor',
}, {
    image: PedestrianImage,
    value: 'pedestrian',
}];
const secondElementsArray = [{
    image: BicycleRoadImage,
    value: 'bicycle',
}, {
    image: CarRoadImage,
    value: 'car',
}, {
    image: TrainRoadImage,
    value: 'train',
}, {
    image: TractorRoadImage,
    value: 'tractor',
}, {
    image: PedestrianRoadImage,
    value: 'pedestrian',
}];

const GuessRoadGame = ({ match }) => {
    const [firstElements, setFirstElements] = useState([]);
    const [secondElements, setSecondElements] = useState([]);


    useEffect(() => {
        const firstElems = firstElementsArray.map(item => ({
            ...item,
            active: false,
            matched: false,
        }));
        const secondElems = secondElementsArray.map(item => ({
            ...item,
            active: false,
            matched: false,
        }));

        setFirstElements(shuffle(firstElems));
        setSecondElements(shuffle(secondElems));
    }, []);

    const onFirstColumnClick = (index) => {
        let firstElementsCopy = [...firstElements];
        const element = firstElementsCopy[index];

        if (element.matched) {
            return;
        }

        firstElementsCopy = firstElementsCopy.map(item => ({
            ...item,
            active: false,
        }));

        element.active = !element.active;
        firstElementsCopy[index] = element;
        setFirstElements(firstElementsCopy);

        verifySelectedItems({ firstElementsCopy });
    };

    const onSecondColumnClick = (index) => {
        let secondElementsCopy = [...secondElements];
        const element = secondElementsCopy[index];

        if (element.matched) {
            return;
        }

        secondElementsCopy = secondElementsCopy.map(item => ({
            ...item,
            active: false,
        }));

        element.active = !element.active;
        secondElementsCopy[index] = element;
        setSecondElements(secondElementsCopy);

        verifySelectedItems({ secondElementsCopy });
    };

    const verifySelectedItems = (params) => {
        const firstElementsCopy = [...(params.firstElementsCopy || firstElements)];
        const secondElementsCopy = [...(params.secondElementsCopy || secondElements)];
        const firstElementIndex = firstElementsCopy.findIndex(item => item.active && !item.matched);
        const secondElementIndex = secondElementsCopy.findIndex(item => item.active && !item.matched);

        if (firstElementIndex === -1 || secondElementIndex === -1) {
            return;
        }

        const firstElement = firstElementsCopy[firstElementIndex];
        const secondElement = secondElementsCopy[secondElementIndex];

        if (firstElement.value === secondElement.value) {
            firstElement.active = false;
            firstElement.matched = true;
            secondElement.active = false;
            secondElement.matched = true;
        } else {
            firstElement.active = false;
            secondElement.active = false;
        }

        firstElementsCopy[firstElementIndex] = firstElement;
        secondElementsCopy[secondElementIndex] = secondElement;
        setFirstElements(firstElementsCopy);
        setSecondElements(secondElementsCopy);
    };

    const firstHasUnmatchedElements = !!firstElements.find(item => !item.matched);
    const secondHasUnmatchedElements = !!firstElements.find(item => !item.matched);
    const isGameDone = !firstHasUnmatchedElements && !secondHasUnmatchedElements;

    return (
        <Wrapper>
            <GameWrapper>
                <Column>
                    {firstElements.map((item, index) => (
                        <ImageContainer onClick={() => onFirstColumnClick(index)}>
                            <Image src={item.image} alt={item.value} active={item.active} matched={item.matched}/>
                            {item.matched && (
                                <ImageDone>
                                    <Done/>
                                </ImageDone>
                            )}
                        </ImageContainer>
                    ))}
                </Column>

                <Text>GASESTE DRUMUL POTRIVIT </Text>

                {isGameDone && <Text>FELICITARI! 🎉</Text>}

                <Column>
                    {secondElements.map((item, index) => (
                        <ImageContainer onClick={() => onSecondColumnClick(index)}>
                            <Image src={item.image} alt={item.value} active={item.active} matched={item.matched}/>
                            {item.matched && (
                                <ImageDone>
                                    <Done/>
                                </ImageDone>
                            )}
                        </ImageContainer>
                    ))}
                </Column>
            </GameWrapper>
        </Wrapper>
    );
};

export default withRouter(GuessRoadGame);