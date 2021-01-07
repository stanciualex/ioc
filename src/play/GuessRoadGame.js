import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router";
import Done from '@material-ui/icons/Done';
import shuffle from 'lodash/shuffle';

import BicycleImage from '../assets/images/guessRoadGame/vehicles/bicycle.jpg';
import CarImage from '../assets/images/guessRoadGame/vehicles/car.jpg';
import TrainImage from '../assets/images/guessRoadGame/vehicles/train.png';
import PedestrianImage from '../assets/images/guessRoadGame/vehicles/pedestrian.jpg';
import BusImage from '../assets/images/guessRoadGame/vehicles/bus.jpg';

import BicycleRoadImage from '../assets/images/guessRoadGame/roads/bicycle.jpg';
import CarRoadImage from '../assets/images/guessRoadGame/roads/car.jpg';
import TrainRoadImage from '../assets/images/guessRoadGame/roads/train.jpg';
import PedestrianRoadImage from '../assets/images/guessRoadGame/roads/pedestrian.jpg';
import BusRoadImage from '../assets/images/guessRoadGame/roads/bus.jpg';

const Wrapper = styled.div`
    background: #36D1DC;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: 100vw;
    padding-top: 50px;
    height: 100vh;
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 80%;
  padding: 0 30px;
`;

const Column = styled.div`
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
  height: 180px;
  @media only screen and (max-width: 1200px) {
        height: 160px;
      }
  cursor: pointer;
  margin: 12px auto;
  position: relative;
  padding: 10px;
`;

const Image = styled.img`
  height: 100%;
  border: 6px solid #ffffff;
  border-radius: 8px;
  overflow: hidden;
  
  ${props => props.active && `
    border: 6px solid #42f54e;
  `}
  
  ${props => props.matched && `
    border: 6px solid #ffffff;
    -webkit-filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(50deg) saturate(1000%) contrast(0.6);
    filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(50deg) saturate(1000%) contrast(0.6);
  `}
`;

const StyledDone = styled(Done)`
  position: absolute;
  top: -8%;
  right: -8%;
  color: #ffffff;
`;

const Text = styled.div`
  font-family: 'Comic Sans MS', cursive;
  text-align: center;
  font-size: 46px;
  color: #ffffff;
  text-shadow: 2px 2px 3px rgba(0,0,0,0.7);
  margin: auto;
  
  @media only screen and (max-width: 1000px) {
    font-size: 36px;
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
},{
    image: BusImage,
    value: 'bus',
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
    image: BusRoadImage,
    value: 'bus',
}, {
    image: PedestrianRoadImage,
    value: 'pedestrian',
}];

const GuessRoadGame = ({ enableContinue }) => {
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

        if (checkIfGameIsDone()) {
            enableContinue();
        }
    };

    const checkIfGameIsDone = () => {
        const firstHasUnmatchedElements = !!firstElements.find(item => !item.matched);
        const secondHasUnmatchedElements = !!firstElements.find(item => !item.matched);

        return !firstHasUnmatchedElements && !secondHasUnmatchedElements;
    };


    const isGameDone = checkIfGameIsDone();

    return (
        <Wrapper>
            <GameWrapper>
                <Column>
                    {firstElements.map((item, index) => (
                        <ImageContainer onClick={() => onFirstColumnClick(index)}>
                            <Image src={item.image} alt={item.value} active={item.active} matched={item.matched}/>
                            {item.matched && (
                                <StyledDone/>
                            )}
                        </ImageContainer>
                    ))}
                </Column>

                <Message>
                    <Text>Găsește drumul potrivit </Text> <br/>

                    {isGameDone && <Text>Joc complet! 🎉</Text>}
                </Message>

                <Column>
                    {secondElements.map((item, index) => (
                        <ImageContainer onClick={() => onSecondColumnClick(index)}>
                            <Image src={item.image} alt={item.value} active={item.active} matched={item.matched}/>
                            {item.matched && (
                                <StyledDone/>
                            )}
                        </ImageContainer>
                    ))}
                </Column>
            </GameWrapper>
        </Wrapper>
    );
};

export default withRouter(GuessRoadGame);
