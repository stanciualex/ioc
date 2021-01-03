import React from 'react';
import styled from 'styled-components';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause'

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #30a6e6;
  position: relative;
  cursor: pointer;
  
  &:hover {
    background-color: #259bdb;
  }
`;

const PlayIcon = styled(PlayArrow)`
  color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50% !important;
  height: 50% !important;
`;

const PauseIcon = styled(Pause)`
  color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50% !important;
  height: 50% !important;
`;

const PlayAudioButton = (props) => {
    const { playing } = props;

    return (
      <Wrapper {...props}>
          {playing ? <PauseIcon/> : <PlayIcon/>}
      </Wrapper>
);
};

export default PlayAudioButton;