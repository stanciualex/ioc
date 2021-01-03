import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Intro from "./intro";
import Learn from "./learn";
import Play from "./play";

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Intro}/>
            <Route exact path="/learn/:id?" component={Learn}/>
            <Route exact path="/play/:id?" component={Play}/>
        </Switch>
    </Router>
  );
}

export default App;
