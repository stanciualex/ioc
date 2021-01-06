import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import shuffle from 'lodash/shuffle';

import Question1 from '../assets/images/answerQuestionsGame/question1.jpg';
import Question2 from '../assets/images/answerQuestionsGame/question2.jpg';
import Question3 from '../assets/images/answerQuestionsGame/question3.jpg';
import Question7 from '../assets/images/answerQuestionsGame/question7.jpg';
import Question8 from '../assets/images/answerQuestionsGame/question8.jpg';
import Question9 from '../assets/images/answerQuestionsGame/question9.jpg';
import Question4Answer1 from '../assets/images/answerQuestionsGame/question4/autobuz.jpg';
import Question4Answer2 from '../assets/images/answerQuestionsGame/question4/tramvai.jpg';
import Question4Answer3 from '../assets/images/answerQuestionsGame/question4/tren.png';
import Question5Answer1 from '../assets/images/answerQuestionsGame/question5/bicicleta.jpg';
import Question5Answer2 from '../assets/images/answerQuestionsGame/question5/masina.jpg';
import Question5Answer3 from '../assets/images/answerQuestionsGame/question5/pieton.jpg';
import Question6Answer1 from '../assets/images/answerQuestionsGame/question6/tren.png';
import Question6Answer2 from '../assets/images/answerQuestionsGame/question6/autobuz.jpg';
import Question6Answer3 from '../assets/images/answerQuestionsGame/question6/motocicleta.jpg';

import AudioController from "../components/AudioController";
import Question1Audio from '../assets/audio/game3/question4.mp3';
import Question2Audio from '../assets/audio/game3/question4.mp3';
import Question3Audio from '../assets/audio/game3/question4.mp3';
import Question4Audio from '../assets/audio/game3/question4.mp3';
import Question5Audio from '../assets/audio/game3/question5.mp3';
import Question6Audio from '../assets/audio/game3/question6.mp3';
import Question7Audio from '../assets/audio/game3/question7.mp3';
import Question8Audio from '../assets/audio/game3/question8.mp3';
import Question9Audio from '../assets/audio/game3/question9.mp3';

const Wrapper = styled.div`
    background: #DC2424;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #4A569D, #DC2424);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #4A569D, #DC2424); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    margin: auto;
    
    .question {
      border: 1px solid black;
      padding: 20px;
      margin-bottom: 60px;
      width: 100%;
      border-radius: 10px;
       
       .audio {
       }
      
      .all-answers {
        display: flex;
        align-items: center;
        
        img {
          height: 200px;
          border-radius: 10px;
        }
      
        .answer {
          margin-left: 30px;
          border: 1px solid white;
          transition: all .2s;
          border-radius: 10px;
          min-width: 180px;
          height: 180px;
          display: flex;
          justify-content: center;
          overflow: hidden;
          
          &:hover {
              cursor: pointer;
              transform: scale(1.05);
          }
        
          img {
             height: 100%;
          }
          
          &.activeTrue {
            -webkit-filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(50deg) saturate(1000%) contrast(0.6);
            filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(50deg) saturate(1000%) contrast(0.6);
          }
          
          &.activeRed {
            -webkit-filter: invert(40%) grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(6);
            filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.6);
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
  
  @media only screen and (max-width: 1000px) {
    font-size: 36px;
  }
`;

const Text = styled.div`
  font-family: 'Comic Sans MS', cursive;
  font-size: 38px;
  color: #ffffff;
  text-shadow: 2px 2px 3px rgba(0,0,0,0.7);
  margin: auto;
  padding-bottom: 20px;
  
  @media only screen and (max-width: 1000px) {
    font-size: 28px;
  }
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 64px;
  width: 90%;
  margin: 100px auto 300px auto;
  
`;

const allQuestions = [
    {
        question: "Se deplaseaza pe unde trebuie biciclistul?",
        answers: [
            {
                text: 'DA'
            },
            {
                text: 'NU'
            },
            {
                text: 'NU stiu'
            }
        ],
        correct: 1,
        audio: Question1Audio,
        image: Question1
    },
    {
        question: "Semaforul este rosu. Are voie pietonul sa treaca?",
        answers: [
            {
                text: 'NU'
            },
            {
                text: 'DA'
            },
            {
                text: 'NU stiu'
            }
        ],
        correct: 0,
        audio: Question2Audio,
        image: Question2
    },
    {
        question: "Motociclistul este imbracat corect?",
        answers: [
            {
                text: 'NU stiu'
            },
            {
                text: 'DA'
            },
            {
                text: 'NU'
            }
        ],
        correct: 2,
        audio: Question3Audio,
        image: Question3
    },
    {
        question: "Cate masini sunt in imagine?",
        answers: [
            {
                text: '2'
            },
            {
                text: '1'
            },
            {
                text: '3'
            }
        ],
        correct: 0,
        audio: Question4Audio,
        image: Question7
    },
    {
        question: "Cate vagoane are trenul din imagine?",
        answers: [
            {
                text: '1'
            },
            {
                text: '3'
            },
            {
                text: '2'
            }
        ],
        correct: 1,
        audio: Question5Audio,
        image: Question8
    },
    {
        question: "Cate tramvaie sunt in imagine?",
        answers: [
            {
                text: '2'
            },
            {
                text: '3'
            },
            {
                text: '1'
            }
        ],
        correct: 2,
        audio: Question6Audio,
        image: Question9
    },
    {
        question: "Merge pe sine, transporta marfa si opreste in gara, ce e?",
        answers: [
            {
                image: Question4Answer1
            },
            {
                image: Question4Answer2
            },
            {
                image: Question4Answer3
            }
        ],
        correct: 1,
        audio: Question7Audio
    },
    {
        question: "Are roti, nu e masina, are pedale, nu merge cu benzina, ce e?",
        answers: [
            {
                image: Question5Answer3
            },
            {
                image: Question5Answer2
            },
            {
                image: Question5Answer1
            }
        ],
        correct: 2,
        audio: Question8Audio
    },
    {
        question: "Multi calatori cara in spate si opreste in statiile special amenajate, ce e?",
        answers: [
            {
                image: Question6Answer2
            },
            {
                image: Question6Answer1
            },
            {
                image: Question6Answer3
            }
        ],
        correct: 0,
        audio: Question9Audio
    }
];

const AnswerQuestionsGame = ({ enableContinue }) => {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const updatedQuestions = allQuestions.map(question => ({
            ...question,
            selectedAnswer: -1,
            answers: question.answers.map(answer => ({
                ...answer,
                selected: false
            }))
        }));
        setQuestions(shuffle(updatedQuestions));
        setScore(0);
    }, []);

    useEffect(() => {
        let score = 0
        questions.forEach(question => {
            if (question.selectedAnswer === question.correct) {
                score++;
            }
        });
        setScore(score);

        const questionWithNoAnswer = !!questions.find(item => item.selectedAnswer === -1);
        if (questions && questions.length && !questionWithNoAnswer) {
            enableContinue();
        }
    }, [questions]);

    const onAnswerClick = (questionIndex, index) => {
        let questionsCopy = [...questions];
        const question = questionsCopy[questionIndex];

        const updatedQuestion = {
            ...question,
            selectedAnswer: index
        }

        questionsCopy[questionIndex] = updatedQuestion
        setQuestions(questionsCopy);
    };

    const questionWithNoAnswer = !!questions.find(item => item.selectedAnswer === -1);
    const gameIsDone = !questionWithNoAnswer;

    return (
        <Wrapper>
            <Title>Raspunde corect la intrebari:</Title>

            <GameWrapper>
                {questions.map((question, questionIndex) => {
                    const allAnswers = question.answers.map((answer, index) => {
                        return (
                            <div
                                className={`answer ${question.selectedAnswer === index && question.selectedAnswer === question.correct ? 'activeTrue' : ''}
                            ${question.selectedAnswer === index && question.selectedAnswer !== question.correct ? 'activeRed' : ''}`}
                                key={answer.id} onClick={() => onAnswerClick(questionIndex, index)}>
                                {answer.text && <Text>{answer.text}</Text>}
                                {answer.image && <img src={answer.image} alt="Answer"/>}
                            </div>
                        )
                    })

                    return (
                        <div className="question" key={question.id}>
                            <div className="audio">

                            </div>
                            <Text>{question.question}</Text>
                            <div className="all-answers">
                                {question.image && <img src={question.image} alt="Question"/>}
                                <AudioController src={question.audio}/>
                                {allAnswers}
                            </div>
                        </div>
                    )
                })}
                {gameIsDone && <Text>Bravo! Ai raspuns corect la {score} intrebari! 🎉</Text>}
            </GameWrapper>
        </Wrapper>
    );
};

export default AnswerQuestionsGame;
