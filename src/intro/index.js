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
  flex: 1 0 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 15%;
  height: 10%;
  min-height: 50px;
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
  margin-top: 5%;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
`;

const Intro = ({ history }) => {
    const isLearnSectionDone = JSON.parse(localStorage.getItem('isLearnSectionDone'));
    const audioSrc = isLearnSectionDone ? GameAudio : LearnAudio;

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
            <AudioWrapper>
                <AudioController src={audioSrc}/>
            </AudioWrapper>
            <LearnSection onClick={goToLearnSection}>
                <Button type="book"/>
            </LearnSection>
            <PlaySection onClick={goToPlaySection} disabled={!isLearnSectionDone}>
                <Button type="play"/>
            </PlaySection>
        </Wrapper>
    );
};

export default withRouter(Intro);