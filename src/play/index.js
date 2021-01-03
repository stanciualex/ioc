import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router";
import GuessRoadGame from "./GuessRoadGame";

const Wrapper = styled.div`
    background: #36D1DC;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: 100vw;
    height: 100vh;
`;

const Play = ({ match }) => {
    const [page, setPage] = useState(0);

    useEffect(() => {
        const paramsPage = parseInt(match.params.id);

        if (!isNaN(paramsPage)) {
            setPage(paramsPage);
        }
    }, [match.params.id]);

    return (
        <Wrapper>
            <GuessRoadGame/>
        </Wrapper>
    );
};

export default withRouter(Play);