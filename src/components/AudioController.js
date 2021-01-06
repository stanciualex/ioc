import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import PlayAudioButton from "./PlayAudioButton";

const Wrapper = styled.div`
  width: 300px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SingleButtonWrapper = styled.div``;

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
  transition: width 0.3s linear;
`;

const AudioController = ({ src, progressBar = true, onProgressCallback, autoPlay = false, disabled = false, }) => {
    const audioElement = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioElement && audioElement.current) {
            audioElement.current.addEventListener('timeupdate', onProgress);

            if (autoPlay) {
                audioElement.current.play();
                setPlaying(true);
            }
        }
    }, [audioElement.current]);

    useEffect(() => {
        if (playing && audioElement.current && audioElement.current.paused) {
            setPlaying(false);
        }
    }, [audioElement.current && audioElement.current.paused]);

    useEffect(() => {
        if (audioElement && audioElement.current) {
            audioElement.current.src = src;
            setPlaying(false);
            setProgress(0);

            if (autoPlay) {
                audioElement.current.play();
                setPlaying(true);
            }
        }
    }, [src]);

    const togglePlaying = () => {
        if (playing) {
            audioElement.current.pause();
        } else {
            const otherAudios = document.querySelectorAll('audio');

            for (let i = 0; i < otherAudios.length; i++) {
                otherAudios[i].pause();
            }
            audioElement.current.play();
        }
        setPlaying(!playing);
    };

    const onProgress = (event) => {
        const { currentTime, duration } = event.target;
        const currentProgress = currentTime * 100 / duration;
        setProgress(currentProgress);
        onProgressCallback && onProgressCallback(currentProgress);

        if (currentProgress === 100) {
            setPlaying(false);
        }
    };

    if (!src) {
        return null;
    }

    const WrapperComponent = progressBar ? Wrapper : SingleButtonWrapper;

    return (
        <WrapperComponent>
            <PlayAudioButton playing={playing} onClick={!disabled && togglePlaying} disabled={disabled}/>

            <audio id="audio" ref={audioElement}>
                <source type="audio/mpeg"/>
            </audio>

            {progressBar && (
                <ProgressBar>
                    <Progress percent={progress}/>
                </ProgressBar>
            )}
        </WrapperComponent>
    );
};

export default AudioController;
