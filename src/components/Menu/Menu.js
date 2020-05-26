import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'


const Menu = () => {
    return (
        <Fragment>
            <aside className="aside aside-fixed">
                <div className="aside-header">
                    <a href="/" className="aside-logo">dash<span>forge</span></a>
                    <a href="#" className="aside-menu-link">
                    <i data-feather="menu"></i>
                    <i data-feather="x"></i>
                    </a>
                </div>
                <div className="aside-body">
                    <div className="aside-loggedin">
                        <div className="d-flex align-items-center justify-content-start">
                            <a href="#" className="avatar"><img src="https://via.placeholder.com/500" className="rounded-circle" alt="" /></a>
                            <div className="aside-alert-link">
                            <a href="#" className="new" data-toggle="tooltip" title="You have 2 unread messages"><i data-feather="message-square"></i></a>
                            <a href="#" className="new" data-toggle="tooltip" title="You have 4 new notifications"><i data-feather="bell"></i></a>
                            <a href="#" data-toggle="tooltip" title="Sign out"><i data-feather="log-out"></i></a>
                            </div>
                        </div>
                        <div className="aside-loggedin-user">
                            <a href="#loggedinMenu" className="d-flex align-items-center justify-content-between mg-b-2" data-toggle="collapse">
                            <h6 className="tx-semibold mg-b-0">Katherine Pechon</h6>
                            <i data-feather="chevron-down"></i>
                            </a>
                            <p className="tx-color-03 tx-12 mg-b-0">Administrator</p>
                        </div>
                        <div className="collapse" id="loggedinMenu">
                            <ul className="nav nav-aside mg-b-0">
                            <li className="nav-item"><a href="#" className="nav-link"><i data-feather="edit"></i> <span>Edit Profile</span></a></li>
                            <li className="nav-item"><a href="#" className="nav-link"><i data-feather="user"></i> <span>View Profile</span></a></li>
                            <li className="nav-item"><a href="#" className="nav-link"><i data-feather="settings"></i> <span>Account Settings</span></a></li>
                            <li className="nav-item"><a href="#" className="nav-link"><i data-feather="help-circle"></i> <span>Help Center</span></a></li>
                            <li className="nav-item"><a href="#" className="nav-link"><i data-feather="log-out"></i> <span>Sign Out</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <ul className="nav nav-aside">
                        <li className="nav-label">event</li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" exact to="/">
                                <i data-feather="layout"></i> <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/live-now">
                                <i data-feather="radio"></i> <span>Live now</span>
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
                    </ul>
                </div>
            </aside>
        </Fragment>
    )
}

export default Menu
