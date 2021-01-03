import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import PlayAudioButton from "./PlayAudioButton";
import ContinueButton from "./ContinueButton";

const Wrapper = styled.div`
  width: 300px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  height: 6px;
  margin-left: 16px;
  border-radius: 4px;
  background-color: #ffffff;
  position: relative;
  width: 90%;
`;

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => `${props.percent}%`};
  background-color: #30a6e6;
  height: 100%;
  border-radius: 4px;
  transition: width 0.1s linear;
`;

const AudioController = ({ src }) => {
    const audioElement = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioElement && audioElement.current) {
            audioElement.current.addEventListener('timeupdate', onProgress);
        }
    }, [audioElement.current]);

    useEffect(() => {
        if (audioElement && audioElement.current) {
            audioElement.current.src = src;
            setPlaying(false);
            setProgress(0);
        }
    }, [src]);

    const togglePlaying = () => {
        if (playing) {
            audioElement.current.pause();
        } else {
            audioElement.current.play();
        }
        setPlaying(!playing);
    };

    const onProgress = (event) => {
        const { currentTime, duration } = event.target;
        const currentProgress = currentTime * 100 / duration;
        setProgress(currentProgress);
    };

    if (!src) {
        return null;
    }

    return (
        <Wrapper>
            <PlayAudioButton playing={playing} onClick={togglePlaying}/>

            <audio id="audio" ref={audioElement}>
                <source type="audio/mpeg"/>
            </audio>

            <ProgressBar>
                <Progress percent={progress}/>
            </ProgressBar>
        </Wrapper>
    );
};

export default AudioController;