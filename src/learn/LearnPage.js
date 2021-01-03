import React from 'react';
import styled from "styled-components";
import ContinueButton from "../components/ContinueButton";
import AudioController from "../components/AudioController";

import QueenImage from '../assets/images/queen.jpg';

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
`;

const Title = styled.h3`
  font-family: 'Dancing Script', cursive;
  text-align: center;
  margin-bottom: 32px;
  font-size: 46px;
  color: #ffffff;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.1);
`;

const Content = styled.div`
  display: flex;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
`;

const RightContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Controls = styled.div`
    display: flex;
    margin: 32px 0;
`;

const Queen = styled.img`
  width: 200px;
  height: auto;
`;

const Image = styled.img`
  width: 80%;
  height: auto;
`;

const LearnPage = ({ audioSource, imageSource, title, onContinue }) => {
    return (
        <Wrapper>
            <Title>{title}</Title>

            <Content>
                <LeftContent>
                    <Queen src={QueenImage} alt="Queen"/>

                    <Controls>
                        <AudioController src={audioSource}/>
                        <ContinueButton onClick={onContinue}/>
                    </Controls>
                </LeftContent>

                <RightContent>
                    <Image src={imageSource} />
                </RightContent>
            </Content>
        </Wrapper>
    );
};

export default LearnPage;