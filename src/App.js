import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css'

import Menu from './components/Menu/Menu';
import Home from './components/Home/Home';
import LiveNow from './components/LiveNow/LiveNow';
import LiveAndUpcoming from "./components/LiveNow/LiveAndUpcomingEvents";
import Schedule from "./components/Schedule/Schedule";
import Lounge from "./components/Lounge/Lounge";
import Sponsors from "./components/Sponsors/Sponsors";
import SponsorProfile from "./components/Sponsors/SponsorProfile";
import AttendeeProfile from "./components/Lounge/AttendeeProfile";
import Sessions from "./components/Stage/Sessions";
import SpeakerProfile from "./components/Lounge/SpeakerProfile";


const App = (props) => {

    return (
		<Router>
			<Menu keycloak={ props.keycloak }  />
			<Switch>
				<Route path="/" exact component={ Home } />
				<Route 
					path="/stage" exact 
					render={ () => <Sessions keycloak={ props.keycloak } /> } />
				<Route path="/live-now" exact component={ LiveNow } />
				<Route path="/live-now/:stage" exact component={ LiveAndUpcoming } />
				<Route path="/schedule" exact component={ Schedule } />
				<Route path="/lounge" exact component={ Lounge } />
				<Route path="/lounge/attendee/:id" exact component={ AttendeeProfile } />
				<Route path="/lounge/speaker/:id" exact component={ SpeakerProfile } />
				<Route path="/sponsors" exact component={ Sponsors } />
				<Route path="/sponsors/:id" exact component={ SponsorProfile } />
			</Switch>
		</Router>
    )
}

export default App;



