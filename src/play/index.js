import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router";
import GuessRoadGame from "./GuessRoadGame";

import Game1Task from '../assets/audio/game1/task.mp3';
import Game2Task from '../assets/audio/game2/task.mp3';
import Game3Task from '../assets/audio/game3/task.mp3';
import AudioController from "../components/AudioController";
import MatchPairsGame from "./MatchPairsGame";
import Button from "../components/Button";
import AnswerQuestionsGame from "./AnswerQuestionsGame";

const Wrapper = styled.div`
    background: #36D1DC;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: 100vw;
    height: 100vh;
`;

const AudioButtonWrapper = styled.div`
  position: absolute;
  left: 16px;
  bottom: 32px;
`;

const ProgressBar = styled.div`
  width: 100%;
  position: absolute;
  ${props => props.top ? 'top: 0' : 'bottom: 0'};
  bottom: 0;
  background-color: #e3e3e3;
  height: 10px;
  z-index: 2; 
`;

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => `${props.percent}%`};
  background-color: ${props => props.backgroundColor};
  height: 100%;
  transition: width 0.33s linear;
`;

const ContinueButtonWrapper = styled.div`
  position: absolute;
  right: 16px;
  bottom: 32px;
  cursor: pointer;
`;


const Play = ({ history, match }) => {
    const [page, setPage] = useState(0);
    const [audioProgress, setAudioProgress] = useState(0);

    useEffect(() => {
        let paramsPage = parseInt(match.params.id);

        if (isNaN(paramsPage)) {
            paramsPage = 1;
        }

        setPage(paramsPage);
    }, [match.params.id]);

    const goNext = () => {
        const nextPage = page ? page + 1 : 1;

        // if (page === LAST_PAGE) {
        //     localStorage.setItem('isLearnSectionDone', JSON.stringify(true));
        //     history.push('/');
        //     return;
        // }

        history.push(`/play/${nextPage}`);
    };

    const getGameAudioByPage = (page) => {
        switch (page) {
            case 1:
                return Game1Task;
            case 2:
                return Game2Task;
            case 3:
                return Game3Task;
            default:
                return null;
        }
    };

    const getGameComponentByPage = (page) => {
        switch (page) {
            case 1:
                return MatchPairsGame;
            case 2:
                return GuessRoadGame;
            case 3:
                return AnswerQuestionsGame;
            case 4:
                return GuessRoadGame;
            default:
                return MatchPairsGame;
        }
    }

    const getGameProgress = (page) => {
        switch (page) {
            case 1:
                return 0;
            case 2:
                return 33.33;
            case 3:
                return 66.66;
            default:
                return 100;
        }
    };

    const onProgressCallback = (value) => setAudioProgress(value);

    const audioSource = getGameAudioByPage(page);
    const GameComponent = getGameComponentByPage(page);
    const gameProgress = getGameProgress(page);

    return (
        <Wrapper>
            <ProgressBar top>
                <Progress percent={gameProgress} backgroundColor="red"/>
            </ProgressBar>

            <GameComponent onc  c/>

            <AudioButtonWrapper>
                <AudioController
                    src={audioSource}
                    progressBar={false}
                    onProgressCallback={onProgressCallback}
                    autoPlay
                />
            </AudioButtonWrapper>

            <ProgressBar>
                <Progress percent={audioProgress} backgroundColor="#30a6e6"/>
                {page < 4 && <ContinueButtonWrapper onClick={goNext}>
                    <Button type="continue"/>
                </ContinueButtonWrapper>}
            </ProgressBar>
        </Wrapper>
    );
};

export default withRouter(Play);
