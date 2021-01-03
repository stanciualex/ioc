import React from 'react';
import styled from "styled-components";
import { withRouter } from "react-router";

import LearnImage from "../assets/images/learn-image.png";
import PlayImage from "../assets/images/play-image.png";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Section = styled.div`
  flex: 1 0 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  ${props => props.disabled && `
    filter: grayscale(100%);
    cursor: no-drop;
  `}
  
  & img {
    transition: all 0.1s linear;
  }
  
  &:hover {
    img {
      transform: scale(1.25);
    }
  }
`;

const LearnSection = styled(Section)`
    background: #de6262; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #de6262, #ffb88c); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #de6262, #ffb88c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const PlaySection = styled(Section)`
    background: #f857a6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ff5858, #f857a6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ff5858, #f857a6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
        <Wrapper>
            <LearnSection onClick={goToLearnSection}>
                <img src={LearnImage} alt="Learn"/>
            </LearnSection>
            <PlaySection onClick={goToPlaySection} disabled={!isLearnSectionDone}>
                <img src={PlayImage} alt="Play"/>
            </PlaySection>
        </Wrapper>
    );
};

export default withRouter(Intro);