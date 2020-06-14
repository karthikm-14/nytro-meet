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


const App = (props) => {

	const [userInfo, setUserInfo] = useState({})
	let [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
        props.keycloak.loadUserInfo().then((userInfo) => {
            const fullName = userInfo.name.split(" ")
            let initial = (fullName.length === 1) ? 
                fullName[0].charAt(0) : 
                `${fullName[0].charAt(0)}${fullName[fullName.length - 1].charAt(0)}`
			setUserInfo({
                name: userInfo.name, 
                email: userInfo.email, 
                id: userInfo.sub,
				initial,
				roles: props.keycloak.tokenParsed.realm_access.roles
			})
			setIsLoading(false)
        })
    }, [])
    
    const logout = () => {
        props.keycloak.logout();
    }

    return (
		<Router>
			<Menu userInfo={ userInfo } logout={ logout } isLoading={ isLoading }  />
			<Switch>
				<Route path="/" exact component={ Home } />
				<Route 
					path="/stage" exact 
					render={ () => <Sessions keycloak={ props.keycloak } /> } />
				<Route path="/live-now" exact component={ LiveNow } />
				<Route path="/live-now/:stage" exact component={ LiveAndUpcoming } />
				<Route path="/schedule" exact component={ Schedule } />
				<Route path="/lounge" exact component={ Lounge } />
				<Route path="/lounge/profile/:id" exact component={ AttendeeProfile } />
				<Route path="/sponsors" exact component={ Sponsors } />
				<Route path="/sponsors/:company" exact component={ SponsorProfile } />
			</Switch>
		</Router>
    )
}

export default App;



