import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import shuffle from 'lodash/shuffle';

import PoliceImage from '../assets/images/police.png';
import TramImage from '../assets/images/tram.jpg';
import TrainImage from '../assets/images/train.jpg';
import BicycleImage from '../assets/images/bicycle.png';
import MotorcycleImage from '../assets/images/motorcycle.jpg';
import CarImage from '../assets/images/redCar.png';
import BusImage from '../assets/images/bus.jpg';
import KidsImage from '../assets/images/kids.jpg';
import GarageImage from '../assets/images/garage.jpg';
import AudioController from "../components/AudioController";
import GameAudio from '../assets/audio/Play_Game.mp3';

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
    
    .question {
      border: 1px solid black;
      padding: 20px;
      margin-bottom: 30px;
      width: 100%;
      border-radius: 10px;
       
       .audio {
       }
      
      .all-answers {
        display: flex;
        align-items: center;
      
        .answer {
          margin-left: 30px;
          border: 1px solid white;
          transition: all .2s;
          border-radius: 10px;
          width: 180px;
          height: 180px;
          display: flex;
          justify-content: center;
          overflow: hidden;
          
          &:hover {
              cursor: pointer;
              transform: scale(1.05);
          }
        
          img {
             width: 100%;
             height: 100%;
          }
          
          &.active {
            border: 1px solid red;
          }
        }
      }
    }
`;

const Title = styled.h3`
  font-family: 'Comic Sans MS', cursive;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 32px;
  font-size: 46px;
  color: #ffffff;
  text-shadow: 2px 2px 3px rgba(0,0,0,0.7);
`;

const Text = styled.div`
  font-family: 'Comic Sans MS', cursive;
  font-size: 38px;
  color: #ffffff;
  text-shadow: 2px 2px 3px rgba(0,0,0,0.7);
  margin: auto;
  padding-bottom: 20px;
`;

const AnswerText = styled.div`
  font-family: 'Comic Sans MS', cursive;
  font-size: 38px;
  color: #ffffff;
  text-shadow: 2px 2px 3px rgba(0,0,0,0.7);
  margin: auto;
  padding-bottom: 20px;
`;

const Board = styled.div`
  height: 800px;
  width: 800px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 64px;
  width: 80%;
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

const allQuestions = [
    {
        question: "Cati cai pot fi inhamati la o caruta?",
        answers: [
            {
                image: PoliceImage
            },
            {
                image: PoliceImage
            },
            {
                image: PoliceImage
            }
        ],
        correct: 1,
        audio: GameAudio
    },
    {
        question: "2",
        answers: [
            {
                id: 1,
                text: 'abc'
            },
            {
                id: 2,
                text: 'bcd'
            },
            {
                id: 3,
                text: 'bcd'
            }
        ],
        correct: 1,
        audio: GameAudio
    }
]

const AnswerQuestionsGame = () => {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [responses, setResponses] = useState(0);

    const computeAnswer = (answer, correctAns) => {
        if (answer === correctAns) {
            setScore(score + 1);
        }
        setResponses(responses + 1)
        // this.setState({
        //     responses: this.state.responses < 5
        //         ? this.state.responses + 1
        //         : 5
        // });
    };

    useEffect(() => {
        const updatedQuestions = allQuestions.map(question => ({
            ...question,
            selectedAnswer: 0,
            answers: question.answers.map(answer => ({
                ...answer,
                selected: false
            }))
        }))
        setQuestions(shuffle(updatedQuestions))
    }, []);

    const onAnswerClick = (questionIndex, index) => {
        let questionsCopy = [...questions];
        const question = questionsCopy[questionIndex];

        const updatedQuestion = {
            ...question,
            selectedAnswer: index
        }

        questionsCopy[questionIndex] = updatedQuestion
        setQuestions(questionsCopy);
        console.log('questionsCopy', questionsCopy)
    }

    const questionWithNoAnswer = !!questions.find(item => !item.selectedAnswer);
    const gameIsDone = !questionWithNoAnswer

    return (
        <Wrapper>
            <Title>Raspunde corect la intrebari:</Title>

            <GameWrapper>
                {questions.map((question, questionIndex) => {
                    const allAnswers = question.answers.map((answer, index) => {
                        return (
                            <div className={`answer ${question.selectedAnswer === index ? 'active' : ''}`} key={answer.id} onClick={() => onAnswerClick(questionIndex, index)}>
                                {answer.text && <Text>{answer.text}</Text>}
                                {answer.image && <img src={answer.image} alt="Answer"/>}
                                {question.selectedAnswer === index && <h3>asparagusss</h3> }
                                selected:{question.selectedAnswer} index: {index}
                            </div>
                        )
                    })

                    return (
                        <div className="question" key={question.id}>
                            <div className="audio">

                            </div>
                            <Text>{question.question}</Text>
                            <div className="all-answers">
                                <AudioController src={question.audio}/>
                                {allAnswers}
                            </div>
                        </div>
                    )
                })}
            </GameWrapper>
            {gameIsDone && <Text>Felicitări! 🎉</Text>}
        </Wrapper>
    );
};

export default AnswerQuestionsGame;
