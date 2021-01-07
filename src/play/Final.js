import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

import CelebrationImage from '../assets/images/celebration.png';
import Button from "../components/Button";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 50%;
  height: auto;
  box-shadow: 0px 0px 4px black;
  border-radius: 10px;
`;

const Text = styled.h3`
  font-family: 'Comic Sans MS', cursive;
  text-align: center;
  margin-bottom: 32px;
  font-size: 46px;
  color: #ffffff;
  text-shadow: 0px 0px 12px rgba(0,0,0,0.7);
  margin-top: 12px;
  
  @media only screen and (max-width: 1000px) {
    font-size: 36px;
  }
`;

const Final = ({ history }) => {
    return (
        <Wrapper>
            <div style={{ textAlign: 'center' }}>
                <Image src={CelebrationImage} alt="Winner"/>
                <Text>Felicitări! Ești noul șef al garajului! 🎉</Text>
                <Button type={'home'} onClick={() => history.push('/')} style={{ cursor: 'pointer' }}/>
            </div>
        </Wrapper>
    );
};

export default withRouter(Final);
