import React, {useEffect, useState} from 'react';
import LearnPage from "./LearnPage";
import { withRouter } from 'react-router';

import PlayLearnAudio from '../assets/audio/Play_Learn.mp3';
import TramAudio from '../assets/audio/Tram.mp3';
import TrainAudio from '../assets/audio/Train.mp3';
import BicycleAudio from '../assets/audio/Bicycle.mp3';
import MotorcycleAudio from '../assets/audio/Motorcycle.mp3';
import CarAudio from '../assets/audio/Car.mp3';
import BusAudio from '../assets/audio/Bus.mp3';
import PedestrianAudio from '../assets/audio/Pedestrian.mp3';

import GarageImage from '../assets/images/garage.jpg';
import TramImage from '../assets/images/tram.jpg';
import TrainImage from '../assets/images/train.jpg';
import BicycleImage from '../assets/images/bicycle.png';
import MotorcycleImage from '../assets/images/motorcycle.jpg';
import CarImage from '../assets/images/car.jpg';
import BusImage from '../assets/images/bus.jpg';
import PedestrianImage from '../assets/images/pedestrian.jpg';

const LAST_PAGE = 7;

const Learn = ({ history, match }) => {
    const [audioSource, setAudioSource] = useState(null);
    const [imageSource, setImageSource] = useState(null);
    const [pageTitle, setPageTitle] = useState('');
    const [page, setPage] = useState(0);

    useEffect(() => {
        const paramsPage = parseInt(match.params.id);

        if (!isNaN(paramsPage)) {
            setPage(paramsPage);
        }

        setAudioSource(getAudioSourceByPage(paramsPage));
        setImageSource(getImageSourceByPage(paramsPage));
        setPageTitle(getTitleByPage(paramsPage));
    }, [match.params.id]);

    const goNext = () => {
        const nextPage = page ? page + 1 : 1;

        if (page === LAST_PAGE) {
            localStorage.setItem('isLearnSectionDone', JSON.stringify(true));
            history.push('/play');
            return;
        }

        history.push(`/learn/${nextPage}`);
    };

    const getAudioSourceByPage = (page) => {
        switch (page) {
            case 1:
                return TramAudio;
            case 2:
                return TrainAudio;
            case 3:
                return BicycleAudio;
            case 4:
                return MotorcycleAudio;
            case 5:
                return CarAudio;
            case 6:
                return BusAudio;
            case 7:
                return PedestrianAudio;
            default:
                return PlayLearnAudio;
        }
    };

    const getImageSourceByPage = (page) => {
        switch (page) {
            case 1:
                return TramImage;
            case 2:
                return TrainImage;
            case 3:
                return BicycleImage;
            case 4:
                return MotorcycleImage;
            case 5:
                return CarImage;
            case 6:
                return BusImage;
            case 7:
                return PedestrianImage;
            default:
                return GarageImage;
        }
    };

    const getTitleByPage = (page) => {
        switch (page) {
            case 1:
                return 'Tramvaiul';
            case 2:
                return 'Trenul';
            case 3:
                return 'Bicicleta';
            case 4:
                return 'Motocicleta';
            case 5:
                return 'Masina';
            case 6:
                return 'Autobuzul';
            case 7:
                return 'Pietonul';
            default:
                return 'Bun venit la garajul meu!';
        }
    };

    return (
        <LearnPage
            audioSource={audioSource}
            imageSource={imageSource}
            title={pageTitle}
            onContinue={goNext}
        />
    );
};

export default withRouter(Learn);