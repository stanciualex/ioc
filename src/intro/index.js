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
  bottom: 48px;
  
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

const Title = styled.div`
  font-family: 'Comic Sans MS', cursive;
  text-align: center;
  margin-bottom: 32px;
  font-size: 46px;
  color: #ffffff;
  text-shadow: 0px 0px 12px rgba(0,0,0,0.7);
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  padding: 16px 24px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  
  @media only screen and (max-width: 1000px) {
    font-size: 36px;
    top: 25%;
  }
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
            <Title>Mijloace de Transport pe Uscat</Title>
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
