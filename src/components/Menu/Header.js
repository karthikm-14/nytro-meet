import React, { Fragment } from 'react'
import { LogOut, Edit, User, Settings, HelpCircle } from 'react-feather';


const Header = (props) => {

    return (
        <Fragment>
            <div className="d-flex align-items-center justify-content-start">
                <a href="" className="avatar avatar-online">
                    <span className="avatar-initial rounded-circle bg-dark">{ props.userInfo.initial }</span>
                </a>
                <div className="aside-alert-link">
                    <span onClick={ props.logout } data-toggle="tooltip" title="Sign out" className="tx-gray-600 mg-l-10 hover-tx-white" type="button">
                        <LogOut />
                    </span>
                </div>
            </div>
            <div className="aside-loggedin-user">
                <a href="#loggedinMenu" className="d-flex align-items-center justify-content-between mg-b-2" data-toggle="collapse">
                <h6 className="tx-semibold mg-b-0">{ props.userInfo.name }</h6>
                <i data-feather="chevron-down"></i>
                </a>
                <p className="tx-color-03 tx-12 mg-b-0">Administrator</p>
            </div>
            {/* <div className="collapse" id="loggedinMenu">
                <ul className="nav nav-aside mg-b-0">
                <li className="nav-item"><a href="#" className="nav-link"><Edit /> <span>Edit Profile</span></a></li>
                <li className="nav-item"><a href="#" className="nav-link"><User /> <span>View Profile</span></a></li>
                <li className="nav-item"><a href="#" className="nav-link"><Settings /> <span>Account Settings</span></a></li>
                <li className="nav-item"><a href="#" className="nav-link"><HelpCircle /> <span>Help Center</span></a></li>
                <li className="nav-item"><p className="nav-link" onClick={ props.logout }><LogOut /> <span>Sign Out</span></p></li>
                </ul>
            </div> */}
        </Fragment>
    )
}

export default Header
