import React from 'react';
import styled from "styled-components";
import { withRouter } from "react-router";

import BackgroundImage from '../assets/images/home-background.jpg';
import LearnAudio from '../assets/audio/Play_Learn.mp3';
import GameAudio from '../assets/audio/Play_Game.mp3';
import Button from "../components/Button";
import AudioController from "../components/AudioController";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const Section = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 16px;
  
  ${props => props.disabled && `
    filter: grayscale(100%);
    cursor: no-drop;
  `}
`;

const LearnSection = styled(Section)`
  left: 16px;
`;

const PlaySection = styled(Section)`
  right: 16px;
`;

const AudioWrapper = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const Intro = ({ history }) => {
    const isLearnSectionDone = JSON.parse(localStorage.getItem('isLearnSectionDone'));

    const goToLearnSection = () => {
        history.push('/learn')
    };

    const goToPlaySection = () => {
        if (isLearnSectionDone) {
            history.push('/play');
        }
    };

    return (
        <Wrapper background={BackgroundImage}>
            <LearnSection>
                <AudioWrapper>
                    <AudioController src={LearnAudio}/>
                </AudioWrapper>
                <Button type="book" onClick={goToLearnSection}/>
            </LearnSection>
            <PlaySection disabled={!isLearnSectionDone}>
                <AudioWrapper>
                    <AudioController src={GameAudio} disabled={!isLearnSectionDone}/>
                </AudioWrapper>
                <Button type="play" onClick={() => isLearnSectionDone && goToPlaySection()}/>
            </PlaySection>
        </Wrapper>
    );
};

export default withRouter(Intro);
