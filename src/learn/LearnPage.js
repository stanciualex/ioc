import React, { useState } from 'react';
import styled from "styled-components";
import AudioController from "../components/AudioController";

import Button from "../components/Button";

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
    position: absolute;
`;

const Title = styled.h3`
  font-family: 'Comic Sans MS', cursive;
  text-align: center;
  margin-bottom: 32px;
  font-size: 46px;
  color: #ffffff;
  text-shadow: 0px 8px 12px rgba(0,0,0,0.7);
  position: absolute;
  top: 16px;
`;

const Image = styled.img`
  width: 70%;
  height: auto;
`;

const AudioButtonWrapper = styled.div`
  position: absolute;
  left: 16px;
  bottom: 32px;
`;

const ContinueButtonWrapper = styled.div`
  position: absolute;
  right: 16px;
  bottom: 32px;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #e3e3e3;
  height: 10px; 
`;

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => `${props.percent}%`};
  background-color: #30a6e6;
  height: 100%;
  transition: width 0.33s linear;
`;

const LearnPage = ({ audioSource, imageSource, title, onContinue }) => {
    const [audioProgress, setAudioProgress] = useState(0);

    const onProgressCallback = (value) => {
        setAudioProgress(value);

        if (value === 100) {
            setTimeout(() => onContinue(), 3000)
        }
    };

    return (
        <Wrapper>
            <Title>{title}</Title>

            <Image src={imageSource} />

            <AudioButtonWrapper>
                <AudioController
                    src={audioSource}
                    progressBar={false}
                    onProgressCallback={onProgressCallback}
                    autoPlay
                />
            </AudioButtonWrapper>

            <ContinueButtonWrapper onClick={onContinue}>
                <Button type="continue"/>
            </ContinueButtonWrapper>

            <ProgressBar>
                <Progress percent={audioProgress} />
            </ProgressBar>
        </Wrapper>
    );
};

export default LearnPage;
