import React from 'react';
import styled from 'styled-components';
import MenuBook from '@material-ui/icons/MenuBook';
import SportsSoccer from '@material-ui/icons/SportsSoccer';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const Wrapper = styled.div`
  width: 200px;
  height: 50px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s linear;
  
  &:hover {
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.15);
    transform: scale(1.1);
  }
`;

const Text = styled.div`
  margin-left: 8px;
`;

const Button = ({ type, ...props }) => {
    let Icon = null;
    let text = '';
    let textColor = '#000000';
    let bgColor = 'transparent';

    if (type === 'book') {
        Icon = MenuBook;
        text = 'Incepe invatarea';
        bgColor = '#02ad04';
        textColor = '#ffffff';
    }

    if (type === 'play') {
        Icon = SportsSoccer;
        text = 'Incepe jocurile';
        bgColor = '#e3db00';
        textColor = '#000000';
    }

    if (type === 'continue') {
        Icon = ArrowForwardIos;
        text = 'Mai departe';
        bgColor = '#02ad04';
        textColor = '#ffffff';
    }

    return (
        <Wrapper backgroundColor={bgColor} color={textColor} {...props}>
            <Icon/>
            <Text>{text}</Text>
        </Wrapper>
    );
};

export default Button;