import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
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
import NotFoundPage from "./components/common/NotFoundPage";


const App = (props) => {

	const [userInfo, setUserInfo] = useState({})
	let [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		props.keycloak.loadUserInfo().then((userInfo) => {
            setUserInfo({
                name: userInfo.name, 
                email: userInfo.email, 
                id: userInfo.sub,
				roles: props.keycloak.tokenParsed.realm_access.roles,
                picture: userInfo.picture,
                position: userInfo.position,
			})
			setIsLoading(false)
        })
	}, [])

	const logout = () => {
        props.keycloak.logout();
    }

    return (
		<Router>
			<Menu userInfo={ userInfo } logout={ logout }  />
			<Switch>
				<Route path="/" exact component={ Home } />
				<Route path="/live-now" exact component={ LiveNow } />
				<Route path="/live-now/:stage" exact component={ LiveAndUpcoming } />
				<Route path="/schedule" exact component={ Schedule } />
				<Route path="/lounge" exact component={ Lounge } />
				<Route path="/lounge/attendee/:id" exact component={ AttendeeProfile } />
				<Route path="/lounge/speaker/:id" exact component={ SpeakerProfile } />
				<Route path="/sponsors" exact component={ Sponsors } />
				<Route path="/sponsors/:id" exact component={ SponsorProfile } />
				<Route path="/404" exact component={NotFoundPage} />
				{
					!isLoading ?
					(userInfo.roles.indexOf('panelist') !== -1 || userInfo.roles.indexOf('moderator') !== -1 ) ?
							<Route 
							path="/stage" exact 
							render={ () => <Sessions userInfo={ userInfo } /> } />  :
							<Redirect to="/404" />
							:
							null
				}
				{
					!isLoading ?
						<Route path="*" component={NotFoundPage} /> :
						null
				}
			</Switch>
		</Router>
    )
}

export default App;



