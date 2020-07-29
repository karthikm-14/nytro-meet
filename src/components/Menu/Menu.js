import React, { Fragment, useState, useEffect } from 'react'
import Header from './Header'
import List from './List'
import { Menu as HamburgerIcon, X } from 'react-feather';


const Menu = (props) => {
    
	const [userInfo, setUserInfo] = useState({})
    let [isLoading, setIsLoading] = useState(true)
    let [initial, setInitial] = useState('')
    
    useEffect(() => {
        if(Object.keys(props.userInfo).length) {
            const fullName = props.userInfo.name.split(" ")
            document.userEmail = props.userInfo.email 
            let initial = (fullName.length === 1) ? 
                fullName[0].charAt(0) : 
                `${fullName[0].charAt(0)}${fullName[fullName.length - 1].charAt(0)}`
            setInitial(initial)
            setUserInfo(props.userInfo)
            setIsLoading(false)
        }
    }, [props.userInfo])

    return (
        <Fragment>
            <aside className="aside aside-fixed">
                <div className="aside-header">
                    <a href="/" className="aside-logo">
                        <img className="logo"  src="/assets/images/horasis-logo.png" />
                    </a>
                    <a href="#" className="aside-menu-link">
                        <HamburgerIcon />
                        <X />
                    </a>
                </div>
                <div className="aside-body">
                    <div className="aside-loggedin">
                        {
                            !isLoading ? 
                                <Header logout={ props.logout } userInfo={ userInfo} initial={ initial } /> :
                                null
                        }
                    </div>
                    <ul className="nav nav-aside">
                        {
                            !isLoading ?
                                <List userInfo={ userInfo} /> :
                                null
                        }
                    </ul>
                </div>
            </aside>
        </Fragment>
    )
}

export default Menu
