import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'


const List = (props) => {

    let { roles} = {...props.userInfo}
    let showStage = roles ? roles.includes('moderator') || roles.includes('panelist') : null
    

    return (
        <Fragment>
            <li className="nav-label">event</li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" exact to="/">
                    <i className="fas fa-th-large mg-r-15 tx-16"></i> <span>Home</span>
                </NavLink>
            </li>
            {
                showStage ? 
                <li className="nav-item">
                    <NavLink activeClassName="active" className="nav-link" exact to="/stage">
                        <i className="fas fa-door-open  mg-r-15 tx-16"></i> <span>Stage</span>
                    </NavLink>
                </li> :
                null
            }
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/live-now">
                <i className="icon ion-ios-radio mg-r-15 tx-18"></i> <span>Live now<span className="event-live d-inline-block wd-3 ht-3 rounded mg-l-8"></span></span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/schedule">
                    <i className="far fa-calendar-alt tx-16 mg-r-15"></i> <span className="mg-l-2">Schedule</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/lounge">
                    <i className="fas fa-cocktail tx-16 mg-r-15"></i> <span>Lounge</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/sponsors">
                    <i className="icon ion-md-business mg-r-15 tx-18"></i> <span>Sponsors</span>
                </NavLink>
            </li>
        </Fragment>
    )
}

export default List
