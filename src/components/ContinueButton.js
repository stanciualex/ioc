import React from 'react';
import styled from 'styled-components';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';

const Wrapper = styled.div`
  width: 300px;
  height: 120px;
  background-color: #02ad04;
  position: relative;
  cursor: pointer;
  
  &:hover {
    background-color: #018f03;
  }
`;

const Arrow = styled(ArrowRightAlt)`
  color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70% !important;
  height: 70% !important;
`;

const ContinueButton = (props) => {
    return (
        <Wrapper {...props}>
            <Arrow/>
        </Wrapper>
    );
};

export default ContinueButton;